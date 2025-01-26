import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import { BACKEND_BASE_URL } from '../lib/constants.js';

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            if (response.data && response.data.user) {
                set({ authUser: response.data.user, isCheckingAuth: false });
                get().connectSocket();
            } else {
                set({ authUser: null, isCheckingAuth: false });
            }
        } catch (err) {
            set({ authUser: null, isCheckingAuth: false });
        }
    },

    signUp: async (formData) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/auth/signup', formData);
            if (response.data && response.data.user) {
                set({ authUser: response.data.user });
                toast.success('Account created successfully');
                get().connectSocket();
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Signup failed');
            set({ authUser: null });
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post('/auth/login', formData);
            if (response.data && response.data) {
                set({ authUser: response.data });
                toast.success('Logged in successfully');
                get().connectSocket();
                return true;
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
            set({ authUser: null });
            return false;
        } finally {
            set({ isLoggingIn: false });
        }
    },

    setUser: (user) => set({ authUser: user }),

    logout: async () => {
        try {
            await axiosInstance.get('/auth/logout');
            set({ authUser: null });
            toast.success('Logged out successfully');
            get().disconnectSocket();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Logout failed');
        }
    },

    updateProfile: async (formData) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.post('/auth/update-profile', formData);
            if (response.data && response.data.user) {
                set({ authUser: response.data.user });
                toast.success('Profile updated successfully');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Profile update failed');
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: async () => {
        const { authUser } = get();
        if (!authUser || get()?.socket?.connected) return;
        const socket = io(BACKEND_BASE_URL, {
            query: {
                userId: authUser._id
            }
        });
        socket.connect();
        set({ socket });
        socket.on('getOnlineUsers', (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: async () => {
        const socket = get().socket;
        if (socket) {
            socket.disconnect();
            set({ socket: null });
        }
    },
}));
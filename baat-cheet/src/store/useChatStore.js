import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { data } from "react-router-dom";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    setSelectedUser: (selectedUser) => {
        set({ selectedUser: selectedUser });
    },

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const { data } = await axiosInstance.get("/messages/users");
            set({ users: data.users });
        } catch (error) {
            toast.error(data.message || "Failed to fetch users");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const { data } = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: data });
        } catch (error) {
            toast.error(data.message || "Failed to fetch messages");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const { data } = await axiosInstance.post(`/messages/send/${selectedUser}`, { ...messageData, selectedUser });
            set({ messages: [...messages, data.message] });
        } catch (err) {
            console.log('err', err);
            toast.error(err.response?.data?.message || 'Failed to send message');
        }
    },

    subscribeToNewMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        socket.on('newMessage', (newMessage) => {
            if (newMessage.senderId !== selectedUser || newMessage.receiverId !== selectedUser) return;
            set({
                messages: [...get().messages, newMessage],
            })
        });
    },

    unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off('newMessage');
    },
}));
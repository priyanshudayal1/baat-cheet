import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Loader2, Mail, Pencil, User, Trash2 } from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";

const Profile = () => {
  const { authUser, isUpdatingProfile, updateProfile, isCheckingAuth } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Show loading state while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  // Redirect or show message if no auth user
  if (!authUser) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-slate-400">Please login to view your profile</p>
      </div>
    );
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024 * 2) { // 2MB limit
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedImg(reader.result);
      handleProfileUpdate(reader.result, fullName);
    };
  };

  const handleRemoveProfilePic = async () => {
    setShowDeleteModal(false);
    await updateProfile({ 
      removeProfilePic: true,
      fullName: authUser.fullName 
    });
    setSelectedImg(null);
  };

  const handleProfileUpdate = async (profilePic, name) => {
    if (!name?.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    
    const updateData = { fullName: name };
    
    // Only include profilePic if it's a new image
    if (profilePic && profilePic.startsWith('data:image')) {
      updateData.profilePic = profilePic;
    }
    
    await updateProfile(updateData);
    setIsEditingName(false);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    handleProfileUpdate(selectedImg || authUser?.profilePic, fullName);
  };

  return (
    <>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-950 to-slate-900">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-700/30 space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Profile Settings</h1>
              <p className="mt-2 text-slate-400">Manage your profile information</p>
            </div>

            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="relative">
                  <img
                    src={selectedImg || authUser?.profilePic || "/avatar.png"}
                    alt="Profile"
                    className="size-32 rounded-full object-cover border-4 border-slate-700/50 group-hover:border-cyan-500/50 transition-colors"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute bottom-0 right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <label
                    htmlFor="avatar-upload"
                    className="size-10 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    <Camera className="size-5 text-white" />
                    <input
                      type="file"
                      id="avatar-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUpdatingProfile}
                    />
                  </label>
                  {(authUser?.profilePic || selectedImg) && (
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      disabled={isUpdatingProfile}
                      className="size-10 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      <Trash2 className="size-5 text-red-500" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-400">
                {isUpdatingProfile ? "Updating..." : "Hover over the image to update or remove"}
              </p>
            </div>

            <div className="space-y-6">
              {/* Full Name Section */}
              <div className="space-y-1.5">
                <div className="text-sm text-slate-400 flex items-center gap-2">
                  <User className="size-4" />
                  Full Name
                </div>
                {isEditingName ? (
                  <form onSubmit={handleNameSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="input flex-1 bg-slate-800/50 border-slate-700/50 focus:border-cyan-500/50"
                      placeholder="Enter your name"
                    />
                    <button
                      type="submit"
                      disabled={isUpdatingProfile}
                      className="btn bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
                    >
                      {isUpdatingProfile ? <Loader2 className="size-4 animate-spin" /> : "Save"}
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <span className="text-slate-200">{authUser?.fullName}</span>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="btn btn-sm btn-ghost"
                    >
                      <Pencil className="size-4 text-cyan-400" />
                    </button>
                  </div>
                )}
              </div>

              {/* Email Section */}
              <div className="space-y-1.5">
                <div className="text-sm text-slate-400 flex items-center gap-2">
                  <Mail className="size-4" />
                  Email Address
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <span className="text-slate-200">{authUser?.email}</span>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-slate-800/30 rounded-xl p-6">
              <h2 className="text-lg font-medium text-slate-200 mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-slate-700/50">
                  <span className="text-slate-400">Member Since</span>
                  <span className="text-slate-200">
                    {new Date(authUser.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-400">Account Status</span>
                  <span className="text-emerald-400">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleRemoveProfilePic}
        title="Remove Profile Picture"
        message="Are you sure you want to remove your profile picture? This action cannot be undone."
      />
    </>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { selectedUser, setSelectedUser, getUsers, isUsersLoading, users } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-slate-800/50 bg-slate-900/50 backdrop-blur-xl flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-slate-800/50 w-full p-5">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-900/20 flex items-center justify-center">
            <Users className="size-5 text-cyan-400" />
          </div>
          <span className="font-medium hidden lg:block text-slate-200">
            Contacts
          </span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2 justify-start">
          <input
            type="checkbox"
            className="toggle toggle-success toggle-sm"
            value={showOnlineOnly}
            onClick={() => setShowOnlineOnly(!showOnlineOnly)}
          />
          <span className="text-sm">Show online users only</span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-3 space-y-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3 transition-all duration-200
              hover:bg-slate-800/50
              ${
                selectedUser?._id === user._id
                  ? "bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-r-2 border-cyan-500"
                  : ""
              }
            `}
          >
            {/* User Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <div className="size-12 rounded-full ring-2 ring-slate-800/60 overflow-hidden">
                <img
                  src={user.profilePic || "./avatar.png"}
                  alt="avatar"
                  className="size-full object-cover"
                />
              </div>
              {/* Online Status Indicator */}
              {onlineUsers.includes(user._id) && (
                <div className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full ring-2 ring-slate-900">
                  <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></div>
                </div>
              )}
            </div>

            {/* User Info - Only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium text-slate-200 truncate">
                {user.fullName}
              </div>
              <div className="text-sm text-slate-400">
                {onlineUsers.includes(user._id) ? (
                  <span className="text-emerald-400">Online</span>
                ) : (
                  "Offline"
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

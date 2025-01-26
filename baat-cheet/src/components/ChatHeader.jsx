import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-4 border-b border-slate-800/50 bg-slate-900/70 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-50 transition"></div>
            <div className="relative size-10 rounded-full ring-2 ring-slate-800/60 overflow-hidden">
              <img 
                src={selectedUser.profilePic || "/avatar.png"} 
                alt={selectedUser.fullName}
                className="size-full object-cover"
              />
            </div>
            {onlineUsers.includes(selectedUser._id) && (
              <div className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full ring-2 ring-slate-900">
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></div>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium text-slate-200">{selectedUser.fullName}</h3>
            <p className="text-sm">
              {onlineUsers.includes(selectedUser._id) ? (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="size-1.5 bg-emerald-500 rounded-full"></span>
                  Online
                </span>
              ) : (
                <span className="text-slate-400">Offline</span>
              )}
            </p>
          </div>
        </div>

        <button 
          onClick={() => setSelectedUser(null)}
          className="size-9 rounded-lg flex items-center justify-center hover:bg-slate-800/50 text-slate-400 hover:text-slate-300 transition-all duration-200"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
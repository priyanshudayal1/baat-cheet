import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center mb-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
            <div className="size-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-900/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-900/30 transition-all duration-500 animate-pulse">
              <MessageSquare className="size-10 text-cyan-400" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Welcome to Baat Cheet!
          </h2>
          <p className="text-slate-400 text-lg">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
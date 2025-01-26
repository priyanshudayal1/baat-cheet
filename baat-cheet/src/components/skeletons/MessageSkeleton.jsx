const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {skeletonMessages.map((_, idx) => (
        <div 
          key={idx} 
          className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"} group`}
        >
          <div className="flex items-end gap-2 max-w-[80%]">
            {/* Avatar - only show for messages on left */}
            {idx % 2 === 0 && (
              <div key={`avatar-${idx}`} className="size-8 rounded-full bg-gradient-to-r from-slate-800 to-slate-700/80 animate-pulse overflow-hidden">
                <div key={`avatar-shine-${idx}`} className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            )}

            {/* Message Content */}
            <div className="space-y-1">
              {/* Sender name - only for messages on left */}
              {idx % 2 === 0 && (
                <div className="h-3 w-24 bg-gradient-to-r from-slate-800 to-slate-700/80 rounded animate-pulse mb-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              )}

              {/* Message bubble */}
              <div 
                className={`
                  rounded-2xl overflow-hidden
                  ${idx % 2 === 0 ? "rounded-bl-sm" : "rounded-br-sm"}
                `}
              >
                <div className={`
                  h-16 
                  ${idx % 2 === 0 
                    ? "w-[200px] bg-gradient-to-r from-slate-800 to-slate-700/80" 
                    : "w-[250px] bg-gradient-to-r from-cyan-500/20 to-blue-900/20"
                  } 
                  animate-pulse
                  overflow-hidden
                `}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex gap-2 items-center">
                <div className="h-2 w-12 bg-gradient-to-r from-slate-800 to-slate-700/80 rounded animate-pulse overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
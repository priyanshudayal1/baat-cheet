import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-slate-800/50 bg-slate-900/50 backdrop-blur-xl flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-slate-800/50 w-full p-5">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-gradient-to-br from-slate-800/80 to-slate-700/80 animate-pulse">
            <Users className="size-5 text-slate-600" />
          </div>
          <span className="font-medium hidden lg:block text-slate-200">
            <div className="h-4 w-20 bg-gradient-to-r from-slate-800 to-slate-700/80 rounded animate-pulse" />
          </span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3 space-y-2">
        {skeletonContacts.map((_, idx) => (
          <div 
            key={idx} 
            className="w-full p-3 flex items-center gap-3 hover:bg-slate-800/30 transition-colors group"
          >
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="size-12 rounded-full bg-gradient-to-r from-slate-800 to-slate-700/80 animate-pulse overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </div>

            {/* Info skeleton */}
            <div className="hidden lg:flex flex-col flex-1 gap-2">
              <div className="h-4 w-32 bg-gradient-to-r from-slate-800 to-slate-700/80 rounded animate-pulse overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
              <div className="h-3 w-16 bg-gradient-to-r from-slate-800 to-slate-700/80 rounded animate-pulse overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
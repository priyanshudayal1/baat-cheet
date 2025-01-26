import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChatStore } from "../store/useChatStore";

const Homepage = () => {
  const { selectedUser, messages } = useChatStore();

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="container mx-auto flex items-center justify-center pt-20 px-4">
        <div className="relative w-full max-w-7xl h-[calc(100vh-8rem)]">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-700/30 rounded-2xl shadow-2xl h-full overflow-hidden">
            <div className="flex h-full">
              <Sidebar />
              {!selectedUser ? (
                <NoChatSelected />
              ) : (
                <ChatContainer messages={messages} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Homepage;

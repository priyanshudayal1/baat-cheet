import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Palette, Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-5xl">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="size-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-900/20 flex items-center justify-center">
              <Palette className="size-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Appearance Settings
              </h1>
              <p className="text-slate-400">Customize your chat interface</p>
            </div>
          </div>

          {/* Theme Selection Section */}
          <div className="bg-base-200 rounded-2xl p-6 border border-base-300">
            <div className="flex flex-col gap-1 mb-6">
              <h2 className="text-lg font-semibold">Theme</h2>
              <p className="text-sm opacity-70">Choose a theme that matches your style</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    group flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300
                    ${theme === t ? "bg-primary/10 border-primary/30" : "hover:bg-base-300"}
                    border border-base-300
                  `}
                  onClick={() => setTheme(t)}
                >
                  <div className="relative h-10 w-full rounded-lg overflow-hidden shadow-lg" data-theme={t}>
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1.5">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className={`text-xs font-medium ${theme === t ? "text-primary" : ""}`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-base-200 rounded-2xl p-6 border border-base-300">
            <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
            <div className="bg-base-100 rounded-xl overflow-hidden border border-base-300">
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-base-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                    J
                  </div>
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-xs opacity-70">Online</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto">
                {PREVIEW_MESSAGES.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`
                        max-w-[80%] rounded-xl p-3 shadow-lg
                        ${message.isSent 
                          ? "bg-primary text-primary-content" 
                          : "bg-base-200"
                        }
                      `}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-[10px] mt-1.5 opacity-70">12:00 PM</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-base-300">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1 text-sm h-10"
                    placeholder="Type a message..."
                    value="This is a preview"
                    readOnly
                  />
                  <button className="btn btn-primary h-10 min-h-0">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
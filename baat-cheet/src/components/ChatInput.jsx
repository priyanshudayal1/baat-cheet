import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.includes("image/")) {
      toast.error("Invalid file type. Please upload an image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });
      // Clear input fields
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="p-4 w-full bg-slate-900/50 backdrop-blur-xl border-t border-slate-800/50">
      {imagePreview && (
        <div className="mb-3">
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-20"></div>
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-32 rounded-lg border border-slate-700/50"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 size-6 rounded-full bg-slate-800 border border-slate-700/50 
                flex items-center justify-center text-slate-400 hover:text-slate-300 transition-colors"
                type="button"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full px-4 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 
            text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className={`hidden sm:flex size-10 items-center justify-center rounded-lg 
              hover:bg-slate-800/50 transition-colors
              ${imagePreview ? "text-cyan-400" : "text-slate-400 hover:text-slate-300"}`}
            onClick={() => fileInputRef.current.click()}
          >
            <Image className="size-5" />
          </button>
        </div>
        <button
          type="submit"
          className={`size-10 rounded-lg flex items-center justify-center transition-all duration-200
            ${!text.trim() && !imagePreview 
              ? "bg-slate-800/50 text-slate-600" 
              : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/20"
            }`}
          disabled={!text.trim() && !imagePreview}
        >
          <Send className="size-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;

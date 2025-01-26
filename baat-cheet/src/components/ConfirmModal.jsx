import { X } from "lucide-react";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900/90 p-6 rounded-2xl border border-slate-700/50 shadow-2xl w-full max-w-md transform scale-100 opacity-100 transition-all">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-300"
        >
          <X className="size-5" />
        </button>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-200">{title}</h3>
          <p className="text-slate-400">{message}</p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="btn btn-sm bg-slate-800 hover:bg-slate-700 border-slate-700"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="btn btn-sm bg-red-500/20 hover:bg-red-500/30 text-red-500 border-red-500/20"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

import type { ModalProps } from "../../../types";

const Modal = ({ isOpen, onClose, children, className = "" }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl p-8 relative w-full max-w-115 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

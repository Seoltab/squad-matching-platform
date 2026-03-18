"use client";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComingSoonModal({ isOpen, onClose }: ComingSoonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl text-center">
        <p className="text-seoltab-dark font-semibold text-lg">
          아직 준비중이에요
        </p>
        <p className="text-seoltab-dark/70 text-sm mt-2">
          더 나은 서비스로 찾아뵐게요.
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-lg bg-seoltab-blue text-white font-medium hover:bg-seoltab-purple transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
}

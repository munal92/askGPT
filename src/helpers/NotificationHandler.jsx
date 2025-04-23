import { useEffect } from "react";

export default function NotificationHandler({
  message,
  show,
  onClose,
  type = "info",
}) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const baseStyles = "px-4 py-3 rounded shadow-md border";
  const typeStyles = {
    success: "bg-green-100 border-green-400 text-green-800",
    error: "bg-red-100 border-red-400 text-red-800",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-800",
    info: "bg-blue-100 border-blue-400 text-blue-800",
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div
        className={`${baseStyles} ${typeStyles[type] || typeStyles.success}`}
      >
        {message}
      </div>
    </div>
  );
}

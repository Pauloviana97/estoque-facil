// components/ui/button.tsx
export default function Button({ children, onClick, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium shadow hover:shadow-md transition-shadow ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
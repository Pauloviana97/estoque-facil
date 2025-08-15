// components/ui/badge.tsx
export default function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-slate-100 text-slate-800",
    secondary: "bg-blue-100 text-blue-800",
    destructive: "bg-red-100 text-red-800"
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
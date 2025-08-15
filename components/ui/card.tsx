// components/ui/card.tsx
export function Card({ children, className = "" }) {
  return <div className={`glass-card rounded-xl border ${className}`}>{children}</div>;
}
export function CardHeader({ children }) {
  return <div className="p-6 border-b border-slate-200">{children}</div>;
}
export function CardTitle({ children, className = "" }) {
  return <h3 className={`text-xl font-bold text-slate-900 ${className}`}>{children}</h3>;
}
export function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
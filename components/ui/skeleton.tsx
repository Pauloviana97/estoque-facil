// components/ui/skeleton.tsx
export default function Skeleton({ className = "" }) {
  return <div className={`bg-slate-200 rounded animate-pulse ${className}`}></div>;
}
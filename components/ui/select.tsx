// components/ui/select.tsx
import React from "react";

export function Select({ children, value, onValueChange }) {
  return (
    <select value={value} onChange={(e) => onValueChange(e.target.value)} className="px-3 py-2 border border-slate-300 rounded-lg">
      {children}
    </select>
  );
}

export function SelectTrigger({ children }) { return <>{children}</>; }
export function SelectValue() { return null; }
export function SelectContent({ children }) { return <>{children}</>; }
export function SelectItem({ value, children }) { return <option value={value}>{children}</option>; }

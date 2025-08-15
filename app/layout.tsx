// app/layout.tsx
import type { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
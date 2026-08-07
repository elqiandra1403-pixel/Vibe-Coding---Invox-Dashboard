'use client';
import * as React from 'react';

export default function AuthTemplate({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition">
      {children}
    </div>
  );
}

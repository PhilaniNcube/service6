"use client";

import { StethoscopeIcon } from "lucide-react";

export function DoctorHeader() {
  return (
    <header className="flex h-12 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <StethoscopeIcon className="h-5 w-5" />
        <span className="font-semibold">Doctor Dashboard</span>
      </div>
    </header>
  );
}

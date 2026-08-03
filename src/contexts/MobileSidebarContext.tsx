"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MobileSidebarContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const MobileSidebarContext = createContext<MobileSidebarContextType | null>(null);

export function MobileSidebarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <MobileSidebarContext.Provider
      value={{ open, setOpen, toggle: () => setOpen((v) => !v) }}
    >
      {children}
    </MobileSidebarContext.Provider>
  );
}

export function useMobileSidebar() {
  const ctx = useContext(MobileSidebarContext);
  if (!ctx)
    throw new Error(
      "useMobileSidebar must be used within MobileSidebarProvider"
    );
  return ctx;
}

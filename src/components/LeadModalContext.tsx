"use client";

import { createContext, useContext, useState } from "react";
import QuickLeadModal from "./QuickLeadModal";

const LeadModalContext = createContext<() => void>(() => {});

export function useLeadModal() {
  return useContext(LeadModalContext);
}

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <LeadModalContext.Provider value={() => setOpen(true)}>
      {children}
      <QuickLeadModal open={open} onClose={() => setOpen(false)} />
    </LeadModalContext.Provider>
  );
}

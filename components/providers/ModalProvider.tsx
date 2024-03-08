"use client";

import { useEffect, useState } from "react";

import SettingsModal from "@/components/modals/SettingsModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  // prevent hydration error
  useEffect(() => {
    setIsMounted(true); 
  }, []);

  // not render modal on server side
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
    </>
  );
};

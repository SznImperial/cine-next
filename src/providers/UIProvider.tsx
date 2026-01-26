"use client";

import { GridBackground } from "@/components/molecules/GridBackground";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

export function UIProvider({ children }: React.PropsWithChildren) {
  return (
    <HeroUIProvider className="dark">
      <ToastProvider />
      <GridBackground />
      <Header />
      {children}
      <Footer />
    </HeroUIProvider>
  );
}

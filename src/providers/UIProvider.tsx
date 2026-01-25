"use client"

import { GridBackground } from "@/components/molecules/GridBackground";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { HeroUIProvider } from "@heroui/react";

export function UIProvider({ children }: React.PropsWithChildren) {
  return (
    <HeroUIProvider className="dark">
      <GridBackground />
      <Header />
      {children}
      <Footer />
    </HeroUIProvider>
  );
}

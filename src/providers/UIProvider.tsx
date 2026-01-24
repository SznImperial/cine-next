"use client";

import { GridBackground } from "@/components/molecules/GridBackground";
import { HeroUIProvider } from "@heroui/react";

export function UIProvider({ children }: React.PropsWithChildren) {
  return (
    <HeroUIProvider className="dark">
      <GridBackground />
      {children}
    </HeroUIProvider>
  );
}

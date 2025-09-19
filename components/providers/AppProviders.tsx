"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import React, { useState } from "react";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient, setQueryClient] = useState(() => new QueryClient());

  const pathname = usePathname();
  // On homepage force dark, else use system/user preference
  const forcedTheme = pathname === "/" ? "dark" : undefined;

  return (
    <QueryClientProvider client={queryClient}>
      <NextTopLoader color="#10b981" showSpinner={false} />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        forcedTheme={forcedTheme}
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

import type { ThemeProviderProps } from "next-themes";
import { Toaster } from "#components/ui/sonner.js";
import { ThemeProvider } from "#providers/theme.js";

export const DesignSystemProvider = ({
  children,
  ...properties
}: ThemeProviderProps) => (
  <ThemeProvider {...properties}>
    {children}
    <Toaster />
  </ThemeProvider>
);

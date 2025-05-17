import type { ThemeProviderProps } from "next-themes";
import { Toaster } from "#components/ui/sonner.js";
import { ThemeProvider } from "#providers/theme.js";

export const Provider = ({ children, ...properties }: ThemeProviderProps) => (
  <ThemeProvider {...properties}>
    {children}
    <Toaster />
  </ThemeProvider>
);

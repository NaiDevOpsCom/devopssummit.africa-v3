// src/test/utils.tsx
import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter, type MemoryRouterProps } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

// ── Test QueryClient ──────────────────────────────────────────────────────────
// Retries disabled so tests fail fast instead of retrying 3x
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
      },
    },
  });

// ── Wrapper Props ─────────────────────────────────────────────────────────────
interface WrapperOptions {
  routerProps?: MemoryRouterProps;
}

// ── Full Provider Wrapper ─────────────────────────────────────────────────────
export function createWrapper({ routerProps }: WrapperOptions = {}) {
  const testQueryClient = createTestQueryClient();

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={testQueryClient}>
        <TooltipProvider>
          <MemoryRouter {...routerProps}>{children}</MemoryRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  };
}

// ── Custom render ─────────────────────────────────────────────────────────────
// Drop-in replacement for @testing-library/react render
// Use this in every component test instead of raw render()
export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & WrapperOptions,
) {
  const { routerProps, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: createWrapper({ routerProps }),
    ...renderOptions,
  });
}

// Re-export everything from testing-library so tests only need one import
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";

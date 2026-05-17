import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import RootLayout from "@/components/layout/RootLayout";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Schedule = lazy(() => import("./pages/Schedule"));
const Sponsorship = lazy(() => import("./pages/Sponsorship"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CodeOfConduct = lazy(() => import("./pages/CodeOfConduct"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const FAQs = lazy(() => import("./pages/FAQs"));
const PastSummits = lazy(() => import("./pages/PastSummits"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const LazyRoute = ({
  component: Component,
}: {
  component: React.LazyExoticComponent<React.ComponentType<unknown>>;
}) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: (
      <ErrorBoundary>
        <div />
      </ErrorBoundary>
    ),
    children: [
      { index: true, element: <LazyRoute component={Index} /> },
      { path: "about", element: <LazyRoute component={AboutUs} /> },
      { path: "schedule", element: <LazyRoute component={Schedule} /> },
      { path: "sponsorship", element: <LazyRoute component={Sponsorship} /> },
      { path: "code-of-conduct", element: <LazyRoute component={CodeOfConduct} /> },
      { path: "privacy-policy", element: <LazyRoute component={PrivacyPolicy} /> },
      { path: "faqs", element: <LazyRoute component={FAQs} /> },
      { path: "past-summits", element: <LazyRoute component={PastSummits} /> },
      { path: "*", element: <LazyRoute component={NotFound} /> },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

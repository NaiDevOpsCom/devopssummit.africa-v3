import React, { lazy, Suspense } from "react";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import SEO from "@/components/SEO";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import { Marquee } from "@/components/landing/Marquee";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const [resetCounter, setResetCounter] = React.useState(0);

  // Define lazy components inside useMemo to allow re-binding on retry
  const { UpcomingEvent, Speakers, Tickets, Benefits, Sponsors, Team, FAQPreview } = React.useMemo(
    () => ({
      UpcomingEvent: lazy(() => import("@/components/landing/UpcomingEvent")),
      Speakers: lazy(() => import("@/components/landing/Speakers")),
      Tickets: lazy(() => import("@/components/landing/Tickets")),
      Benefits: lazy(() => import("@/components/landing/Benefits")),
      Sponsors: lazy(() => import("@/components/landing/Sponsors")),
      Team: lazy(() => import("@/components/landing/Team")),
      FAQPreview: lazy(() => import("@/components/landing/FAQPreview")),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resetCounter],
  );

  return (
    <main>
      <SEO
        description="Join Africa's premier DevOps, Cloud & SRE conference. November 2026, Nairobi, Kenya. In-person + virtual."
        keywords="DevOps, Africa, cloud, SRE, Kubernetes, conference, Nairobi, Kenya, 2026"
        canonicalUrl="/"
        ogType="event"
      />
      <Navbar />
      <Hero />
      <About />
      <ErrorBoundary
        onReset={() => setResetCounter((prev) => prev + 1)}
        fallback={({ reset }) => (
          <div className="py-20 text-center">
            <p className="text-muted-foreground mb-4">Failed to load sections.</p>
            <button onClick={reset} className="text-primary hover:underline">
              Retry Loading
            </button>
          </div>
        )}
      >
        <div className="space-y-0" key={resetCounter}>
          <Suspense fallback={<div className="min-h-[400px] animate-pulse bg-muted/20" />}>
            <UpcomingEvent />
          </Suspense>
          <Suspense fallback={<div className="min-h-[600px] animate-pulse bg-muted/10" />}>
            <Speakers />
          </Suspense>

          <div className="py-4 bg-dark-bg overflow-hidden flex flex-col gap-0">
            <Marquee
              items={[
                "DevOps Summit Africa 2026",
                "Nairobi, Kenya",
                "Cloud Native",
                "SRE & Platform Engineering",
                "Open Source",
                "AI & ML",
                "Security & Compliance",
              ]}
              direction="left"
              speed={40}
              variant="primary"
              withFade={false}
            />
            <Marquee
              items={[
                "November 2026",
                "Register Now",
                "Call for Speakers Open",
                "Early Bird Tickets Live",
                "Join the Community",
                "Africa's Premier Tech Event",
              ]}
              direction="right"
              speed={35}
              variant="secondary"
              skew
              withFade={false}
            />
          </div>

          <Suspense fallback={<div className="min-h-[500px] animate-pulse bg-muted/20" />}>
            <Tickets />
          </Suspense>
          <Suspense fallback={<div className="min-h-[400px] animate-pulse bg-muted/10" />}>
            <Benefits />
          </Suspense>
          <Suspense fallback={<div className="min-h-[300px] animate-pulse bg-muted/20" />}>
            <Sponsors />
          </Suspense>
          <Suspense fallback={<div className="min-h-[600px] animate-pulse bg-muted/10" />}>
            <Team />
          </Suspense>
          <Suspense fallback={<div className="min-h-[400px] animate-pulse bg-muted/20" />}>
            <FAQPreview />
          </Suspense>
        </div>
      </ErrorBoundary>
      <Footer />
    </main>
  );
};

export default Index;

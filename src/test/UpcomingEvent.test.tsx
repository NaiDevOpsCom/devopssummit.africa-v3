import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import UpcomingEvent from "@/components/landing/UpcomingEvent";
import React from "react";
import { MemoryRouter } from "react-router-dom";

vi.mock("framer-motion", () => {
  const filterProps = (props: any) => {
    const {
      initial: _initial,
      animate: _animate,
      exit: _exit,
      transition: _transition,
      whileInView: _whileInView,
      whileHover: _whileHover,
      whileTap: _whileTap,
      viewport: _viewport,
      variants: _variants,
      layoutId: _layoutId,
      layout: _layout,
      ...validProps
    } = props;
    return validProps;
  };

  return {
    motion: {
      div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
        <div {...filterProps(props)}>{children}</div>
      ),
    },
    useReducedMotion: () => false,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe("UpcomingEvent", () => {
  it("renders the correct event date", () => {
    render(
      <MemoryRouter>
        <UpcomingEvent />
      </MemoryRouter>,
    );
    expect(screen.getByText("November 20–21, 2026")).toBeInTheDocument();
  });

  it("renders the heading", () => {
    render(
      <MemoryRouter>
        <UpcomingEvent />
      </MemoryRouter>,
    );
    expect(screen.getByText("Build. Scale. Automate Africa.")).toBeInTheDocument();
  });

  it("renders location info", () => {
    render(
      <MemoryRouter>
        <UpcomingEvent />
      </MemoryRouter>,
    );
    expect(screen.getByText("Nairobi, Kenya")).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(
      <MemoryRouter>
        <UpcomingEvent />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText("Get a Ticket")).toBeInTheDocument();
    expect(screen.getByLabelText("Become a Sponsor")).toBeInTheDocument();
  });

  it("handles image error by setting fallback", () => {
    render(
      <MemoryRouter>
        <UpcomingEvent />
      </MemoryRouter>,
    );
    const img = document.querySelector("img") as HTMLImageElement;
    fireEvent.error(img);
    expect(img.src).toContain("data:image/gif");
  });

  it("cycles background image on interval", () => {
    vi.useFakeTimers();
    render(
      <MemoryRouter>
        <UpcomingEvent />
      </MemoryRouter>,
    );
    Object.defineProperty(document, "visibilityState", { value: "visible", configurable: true });
    fireEvent(document, new Event("visibilitychange"));

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    vi.useRealTimers();
  });
});

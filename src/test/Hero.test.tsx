import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/landing/Hero";
import React from "react";
import { MemoryRouter } from "react-router-dom";

// Mock framer-motion to avoid animation issues in tests
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
      span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
        <span {...filterProps(props)}>{children}</span>
      ),
      h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 {...filterProps(props)}>{children}</h1>
      ),
      p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p {...filterProps(props)}>{children}</p>
      ),
      div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
        <div {...filterProps(props)}>{children}</div>
      ),
    },
    useReducedMotion: () => false,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock canvas
HTMLCanvasElement.prototype.getContext = vi.fn(
  () =>
    ({
      clearRect: vi.fn(),
      beginPath: vi.fn(),
      arc: vi.fn(),
      fill: vi.fn(),
      moveTo: vi.fn(),
      lineTo: vi.fn(),
      stroke: vi.fn(),
      fillStyle: "",
      strokeStyle: "",
      lineWidth: 0,
    }) as unknown as CanvasRenderingContext2D,
) as unknown as typeof HTMLCanvasElement.prototype.getContext;

describe("Hero", () => {
  it("renders the event date badge", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );
    expect(screen.getByText(/November 20–21, 2026/)).toBeInTheDocument();
  });

  it("renders the main heading", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );
    expect(screen.getByText("African Tech")).toBeInTheDocument();
    expect(screen.getByText("Shaping the Future")).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText("Become a Sponsor")).toBeInTheDocument();
    expect(screen.getByLabelText("Become a Speaker")).toBeInTheDocument();
  });

  it("renders countdown units", () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );
    expect(screen.getByText("Days")).toBeInTheDocument();
    expect(screen.getByText("Hours")).toBeInTheDocument();
    expect(screen.getByText("Min")).toBeInTheDocument();
    expect(screen.getByText("Sec")).toBeInTheDocument();
  });
});

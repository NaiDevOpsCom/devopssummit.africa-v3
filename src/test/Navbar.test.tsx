import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "@/components/layout/Navbar";
import { MemoryRouter } from "react-router-dom";

describe("Navbar", () => {
  it("renders the brand name", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(screen.getByText("AFRICA DEVOPS SUMMIT")).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("About Us").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Sponsors").length).toBeGreaterThanOrEqual(1);
  });

  it("renders Get a Ticket button", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText("Get a ticket")).toBeInTheDocument();
  });

  it("toggles mobile menu on hamburger click", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    const menuBtn = screen.getByLabelText("Open menu");
    fireEvent.click(menuBtn);
    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
  });
});

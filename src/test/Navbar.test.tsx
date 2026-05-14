import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "@/components/layout/Navbar";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

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
    expect(screen.getByLabelText("Get Your Tickets")).toBeInTheDocument();
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

  it("handles scroll to change background", async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    Object.defineProperty(globalThis, "scrollY", {
      value: 100,
      configurable: true,
      writable: true,
    });
    (globalThis as unknown as Window).dispatchEvent(new Event("scroll"));
    await waitFor(() => {
      expect(screen.getByRole("navigation")).toHaveClass("bg-background/80", { exact: false });
    });
    Object.defineProperty(globalThis, "scrollY", {
      value: 0,
      configurable: true,
      writable: true,
    });
  });

  it("navigates to route on click", () => {
    Object.defineProperty(globalThis, "innerHeight", { value: 1000, configurable: true });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>,
    );
    const aboutLink = screen.getAllByText("About Us")[0];
    fireEvent.click(aboutLink);
    expect(mockNavigate).toHaveBeenCalledWith("/about");
  });

  it("handles get a ticket click on non-home page", () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <Navbar />
      </MemoryRouter>,
    );
    const getTicketBtns = screen.getAllByText("Get Your Tickets");
    fireEvent.click(getTicketBtns[0]);
    expect(mockNavigate).toHaveBeenCalledWith("/#tickets");
  });
});

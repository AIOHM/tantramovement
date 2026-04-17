import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import AffiliateForm from "../AffiliateForm";

expect.extend(matchers);

afterEach(() => cleanup());

describe("AffiliateForm", () => {
  it("shows validation errors for empty fields", async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined);
    render(<AffiliateForm onSubmit={handleSubmit} />);

    await userEvent.click(screen.getByRole("button", { name: /create partner link/i }));

    expect(screen.getByText(/please enter a url, your affiliate id, and a short description/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("shows validation error for invalid URL", async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined);
    render(<AffiliateForm onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByLabelText(/referral url or path/i), "invalid-url");
    await userEvent.type(screen.getByLabelText(/your affiliate id/i), "partner123");
    await userEvent.type(screen.getByLabelText(/partner invitation description/i), "Hello partner");
    await userEvent.click(screen.getByRole("button", { name: /create partner link/i }));

    expect(screen.getByText(/please enter a valid url or path/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("submits valid data and shows success message", async () => {
    const handleSubmit = vi.fn().mockResolvedValue(undefined);
    render(<AffiliateForm onSubmit={handleSubmit} />);

    await userEvent.type(screen.getByLabelText(/referral url or path/i), "/affiliate/test-link");
    await userEvent.type(screen.getByLabelText(/your affiliate id/i), "partner123");
    await userEvent.type(screen.getByLabelText(/partner invitation description/i), "Share this with friends.");
    await userEvent.click(screen.getByRole("button", { name: /create partner link/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      url: "/affiliate/test-link",
      affiliateId: "partner123",
      description: "Share this with friends.",
    });
    expect(await screen.findByText(/partner link created/i)).toBeInTheDocument();
  });
});

import { render, screen, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import { afterEach, describe, expect, it } from "vitest";
import AffiliateDashboard from "../AffiliateDashboard";

expect.extend(matchers);

afterEach(() => cleanup());

describe("AffiliateDashboard", () => {
  it("shows a loading ritual when loading", () => {
    render(<AffiliateDashboard links={[]} loading={true} metrics={{}} />);

    expect(screen.getByText(/loading partner performance/i)).toBeInTheDocument();
  });

  it("shows empty state when no links are available", () => {
    render(<AffiliateDashboard links={[]} loading={false} metrics={{}} />);

    expect(screen.getByText(/no affiliate links yet/i)).toBeInTheDocument();
  });

  it("renders affiliate links and metrics", () => {
    const links = [
      {
        id: "1",
        url: "https://tantramovement.com/affiliate/abc123",
        description: "Conscious partners",
        createdAt: new Date("2026-01-01T00:00:00Z").toISOString(),
      },
    ];
    const metrics = {
      "1": { clicks: 10, conversions: 2, revenue: 50 },
    };

    render(<AffiliateDashboard links={links} loading={false} metrics={metrics} />);

    expect(screen.getByText(/conscious partners/i)).toBeInTheDocument();
    expect(screen.getByText(/clicks: 10/i)).toBeInTheDocument();
    expect(screen.getByText(/conversions: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/revenue: \$50\.00/i)).toBeInTheDocument();
  });
});

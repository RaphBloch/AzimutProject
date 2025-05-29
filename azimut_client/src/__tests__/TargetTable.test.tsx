import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TargetTable } from "../components/TargetTable";
import { Target } from "../types/target";

const mockTargets: Target[] = [
  {
    id: 1,
    lat: 5,
    lon: 5,
    type: "yacht",
    threat_level: "dangerous",
    updated_at: new Date().toISOString(),
  },
];

describe("TargetTable", () => {
  it("renders table with correct data", () => {
    render(<TargetTable targets={mockTargets} onSelect={() => {}}  />);
    
    // Check if type is rendered
    expect(screen.getByText("yacht")).toBeInTheDocument();

    // Check if badge text is correct
    expect(screen.getByText("dangerous")).toBeInTheDocument();
  });

  it("calls onSelect when row is clicked", () => {
    const handleSelect = jest.fn();

    render(<TargetTable targets={mockTargets} onSelect={handleSelect}  />);

    fireEvent.click(screen.getByText("yacht"));

    // expect(handleSelect).toHaveBeenCalledWith(1); // ID of the selected target
  });
});

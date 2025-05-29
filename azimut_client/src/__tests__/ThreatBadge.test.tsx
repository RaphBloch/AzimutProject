
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { ThreatBadge } from "../components/ThreatBadge";


describe("ThreatBadge", () => {
 it("renders Badge with correct color", () => {
  render(<ThreatBadge level="dangerous" />);

  const badge = screen.getByText("dangerous");

  // Check the text is present
  expect(badge).toBeInTheDocument();

  // Check if the color is red via computed style (background-color)
  expect(badge).toHaveStyle("background-color: #e53e3e");
})
});
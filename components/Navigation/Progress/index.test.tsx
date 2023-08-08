import { expect } from "@jest/globals";
import { useIsFetching } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import React from "react";

import NavigationProgress, { INavigationProgressProps } from "./index";

// Mock @tanstack/react-query module
jest.mock("@tanstack/react-query", () => ({
  useIsFetching: jest.fn(),
}));

describe("NavigationProgress component", () => {
  const mockUseIsFetching = useIsFetching as jest.Mock;

  it("applies isFetching styles when isFetching is true", () => {
    mockUseIsFetching.mockReturnValue(true);

    const { container } = render(<NavigationProgress />);

    const navigationProgressElement =
      container.querySelector(".root.isFetching");

    expect(navigationProgressElement).toBeInTheDocument();
  });

  it("does not apply isFetching styles when isFetching is false", () => {
    mockUseIsFetching.mockReturnValue(false);

    const { container } = render(<NavigationProgress />);

    const navigationProgressElement =
      container.querySelector(".root.isFetching");

    expect(navigationProgressElement).toBeNull();
  });
});

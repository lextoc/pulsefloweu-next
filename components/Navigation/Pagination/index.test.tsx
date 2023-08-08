import { expect } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

import Pagination, { PaginationProps } from "./index";

// Mock next/navigation module
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("Pagination component", () => {
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  const mockRouterPush = jest.fn();

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
    });
    mockUsePathname.mockReturnValue("/example-path");
    mockUseSearchParams.mockReturnValue(new URLSearchParams("page=1"));
  });

  const defaultProps: PaginationProps = {
    current_page: 1,
    next_page: 2,
    per_page: 10,
    prev_page: null,
    total_pages: 5,
    total_count: 40,
  };

  it("renders pagination buttons", () => {
    const { getByText } = render(<Pagination {...defaultProps} />);

    for (let page = 1; page <= 5; page++) {
      const button = getByText(page.toString());
      expect(button).toBeInTheDocument();
    }
  });

  it("applies active style to current page button", () => {
    const { getByText } = render(<Pagination {...defaultProps} />);

    const activeButton = getByText("1");
    expect(activeButton).toHaveClass("buttonActive");
  });

  it("calls router.push when clicking on a page button", () => {
    const { getByText } = render(<Pagination {...defaultProps} />);

    const button = getByText("2");
    fireEvent.click(button);

    expect(mockRouterPush).toHaveBeenCalledWith("/example-path?page=2");
  });

  it("does not render pagination when total_count is less than per_page", () => {
    const { container } = render(
      <Pagination {...defaultProps} total_count={5} />,
    );

    const pagination = container.querySelector(".pagination");

    expect(pagination).toBeNull();
  });

  it("does not render pagination when current_page is not provided", () => {
    const { container } = render(
      <Pagination {...defaultProps} current_page={undefined} />,
    );

    const pagination = container.querySelector(".pagination");

    expect(pagination).toBeNull();
  });
});

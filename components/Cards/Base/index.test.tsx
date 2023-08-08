import { expect } from "@jest/globals";
import { render } from "@testing-library/react";
import React from "react";

import Card, { CardProps } from "./index";

describe("Card component", () => {
  const defaultProps: CardProps = {
    header: "Header Content",
    content: "Card Content",
    footer: "Footer Content",
  };

  it("renders header, content, and footer", () => {
    const { getByText } = render(<Card {...defaultProps} />);

    const headerElement = getByText("Header Content");
    const contentElement = getByText("Card Content");
    const footerElement = getByText("Footer Content");

    expect(headerElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });

  it("renders only header and content when footer is not provided", () => {
    const { getByText, queryByText } = render(
      <Card {...defaultProps} footer={undefined} />,
    );

    const headerElement = getByText("Header Content");
    const contentElement = getByText("Card Content");
    const footerElement = queryByText("Footer Content");

    expect(headerElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(footerElement).toBeNull();
  });

  it("applies moving background styles when hasMovingBackground is true", () => {
    const { container } = render(
      <Card {...defaultProps} hasMovingBackground />,
    );

    const cardElement = container.querySelector(".rootMovingBackground");

    expect(cardElement).toBeInTheDocument();
  });

  it("does not apply moving background styles when hasMovingBackground is false", () => {
    const { container } = render(
      <Card {...defaultProps} hasMovingBackground={false} />,
    );

    const cardElement = container.querySelector(".rootMovingBackground");

    expect(cardElement).toBeNull();
  });
});

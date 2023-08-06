import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import Button, { ButtonProps } from "./index";

describe("Button component", () => {
  let defaultProps: ButtonProps = {
    children: "Click me",
  };

  it("renders a button with children when no nextLink is provided", () => {
    const { getByRole } = render(<Button {...defaultProps} />);

    const button = getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  it("renders a link when nextLink is provided", () => {
    const { getByRole } = render(
      <Button {...defaultProps} nextLink="/somewhere" />,
    );

    const link = getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Click me");
  });

  it("applies styles based on variant, danger, and noMargin props", () => {
    const { getByRole } = render(
      <Button {...defaultProps} variant="subtle" danger noMargin />,
    );

    const button = getByRole("button");
    expect(button).toHaveClass("subtle");
    expect(button).toHaveClass("danger");
    expect(button).toHaveClass("noMargin");
  });

  it("triggers a click event when clicked", async () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button {...defaultProps} onClick={handleClick} />,
    );

    const button = getByRole("button");
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

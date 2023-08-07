import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { PopoverProps } from "./index";
import Popover from "./index";

describe("Popover component", () => {
  const defaultContent = <div>Popover Content</div>;
  const defaultButton = <div>Click me</div>;
  const defaultProps: PopoverProps = {
    content: defaultContent,
    button: defaultButton,
  };

  it("renders the popover button and content", () => {
    render(<Popover {...defaultProps} />);

    const popoverButton = screen.getByRole("button", { name: "Click me" });
    expect(popoverButton).toBeInTheDocument();

    fireEvent.click(popoverButton);

    const popoverContent = screen.getByText("Popover Content");
    expect(popoverContent).toBeInTheDocument();
  });

  it("toggles popover content when button is clicked", () => {
    render(<Popover {...defaultProps} />);

    const popoverButton = screen.getByRole("button", { name: "Click me" });
    expect(popoverButton).toBeInTheDocument();

    fireEvent.click(popoverButton);

    const popoverContent = screen.getByText("Popover Content");
    expect(popoverContent).toBeInTheDocument();

    fireEvent.click(popoverButton);

    expect(popoverContent).not.toBeInTheDocument();
  });

  it("renders custom button and content", () => {
    const customButton = <div>Custom Button</div>;
    const customContent = <div>Custom Content</div>;
    const customProps: PopoverProps = {
      content: customContent,
      button: customButton,
    };

    render(<Popover {...customProps} />);

    const popoverButton = screen.getByRole("button", {
      name: /Custom Button/i,
    });
    expect(popoverButton).toBeInTheDocument();

    fireEvent.click(popoverButton);

    const popoverContent = screen.getByText("Custom Content");
    expect(popoverContent).toBeInTheDocument();
  });
});

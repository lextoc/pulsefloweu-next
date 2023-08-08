import { expect } from "@jest/globals";
import { render } from "@testing-library/react";
import React from "react";

import Input, { InputProps } from "./index";

describe("Input component", () => {
  const defaultProps: InputProps = {
    type: "text",
    label: "Input Label",
  };

  it("renders with label", () => {
    const { getByLabelText } = render(<Input {...defaultProps} />);

    const inputElement = getByLabelText("Input Label");

    expect(inputElement).toBeInTheDocument();
  });

  it("applies inverted styles when inverted is true", () => {
    const { container } = render(<Input {...defaultProps} inverted />);

    const inputElement = container.querySelector(".inverted");

    expect(inputElement).toBeInTheDocument();
  });

  it("applies transparent styles when transparent is true", () => {
    const { container } = render(<Input {...defaultProps} transparent />);

    const inputElement = container.querySelector(".transparent");

    expect(inputElement).toBeInTheDocument();
  });

  it("applies small styles when small is true", () => {
    const { container } = render(<Input {...defaultProps} small />);

    const inputElement = container.querySelector(".small");

    expect(inputElement).toBeInTheDocument();
  });

  it("applies fullWidth styles when fullWidth is true", () => {
    const { container } = render(<Input {...defaultProps} fullWidth />);

    const inputElement = container.querySelector(".fullWidth");

    expect(inputElement).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Input {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});

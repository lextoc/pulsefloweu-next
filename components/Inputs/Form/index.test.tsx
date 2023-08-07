import { render } from "@testing-library/react";
import React from "react";

import Form, { FormProps } from "./index";

describe("Form component", () => {
  const defaultProps: FormProps = {
    children: <div>Form Content</div>,
  };

  it("renders form content", () => {
    const { getByText } = render(<Form {...defaultProps} />);

    const formContent = getByText("Form Content");

    expect(formContent).toBeInTheDocument();
  });

  it("applies root styles", () => {
    const { container } = render(<Form {...defaultProps} />);

    const formElement = container.querySelector(".root");

    expect(formElement).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    const { getByRole } = render(<Form {...defaultProps} />);

    const submitButton = getByRole("button", { type: "submit" });

    expect(submitButton).toBeInTheDocument();
  });

  it("applies submit button styles", () => {
    const { container } = render(<Form {...defaultProps} />);

    const submitButton = container.querySelector(".submit");

    expect(submitButton).toBeInTheDocument();
  });
});

import { render } from "@testing-library/react";
import React from "react";

import { Label, LabelProps } from "./index";

describe("Label component", () => {
  const defaultProps: LabelProps = {
    children: "Label Text",
    htmlFor: "inputId",
  };

  it("renders label text", () => {
    const { getByText } = render(<Label {...defaultProps} />);

    const labelText = getByText("Label Text");

    expect(labelText).toBeInTheDocument();
  });

  it("applies root styles", () => {
    const { container } = render(<Label {...defaultProps} />);

    const labelElement = container.querySelector(".root");

    expect(labelElement).toBeInTheDocument();
  });
});

// TestComponent.test.ts
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Button, { ButtonProps } from "../Button";

describe("Button", () => {
  let props: ButtonProps;

  beforeEach(() => {
    props = {
      type: "primary",
    };
  });

  it("should click", () => {
    const { container } = render(
      <Button
        {...props}
        onClick={() => {
          console.log(1111);
        }}
      />
    );
    fireEvent.click(container.firstChild!);
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";

const CompInSrc = import("componentInPackage/CompInSrc");
const OptionComp = import("deltaone/OptionComp");

describe("Federation", function () {
  it("Testing CompInSrc from Remote", async function () {
    const Comp = (await CompInSrc).default;
    render(<Comp />);

    expect(screen.getByText("CompInSrc component")).toBeTruthy();
  });

  it("Testing CompInSrc from OptionComp", async function () {
    const OptionComponent = (await OptionComp).default;

    render(<OptionComponent />);

    expect(screen.getByText("OptionComp component")).toBeTruthy();
    expect(screen.getByText("CompInSrc component")).toBeTruthy();
  });
});

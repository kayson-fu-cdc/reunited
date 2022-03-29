const CompInSrc = import("componentInPackage/CompInSrc");

// const OptionComp = import("deltatwo/OptionComp");

global.fetch = jest.fn((s) =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 123 }),
  })
);

describe("Federation", function () {
  // it("Testing CompInSrc from Remote", async function () {
  //   const React = await import("react");
  //   const { render, screen, waitFor } = await import("@testing-library/react");
  //   // const { shallow, mount, render } = await import("enzyme");

  //   const Comp = (await CompInSrc).default;
  //   render(<Comp />);

  //   expect(screen.getByText("CompInSrc component")).toBeTruthy();

  //   await waitFor(() => {
  //     // expect(global.fetch).toBeCalledWith("g");
  //     expect(screen.getByText(`status is: {"status":123}`)).toBeTruthy();
  //   });
  // });

  it("Testing CompInSrc2 from Remote", async function () {
    const React = await import("react");
    const { render, waitFor, cleanup } = await import("@testing-library/react");
    // const { shallow, mount, render } = await import("enzyme");

    const Comp = (await CompInSrc).default;
    const { getByText } = render(<Comp />);

    expect(getByText("CompInSrc component")).toBeTruthy();

    await waitFor(() => {
      // expect(global.fetch).toBeCalledWith("g");
      expect(getByText(`status is: {"status":123}`)).toBeTruthy();
    });

    cleanup();
  });

  it("Testing CompInSrc from Remote", async function () {
    const React = await import("react");
    const { render, waitFor, cleanup } = await import("@testing-library/react");
    // const { shallow, mount, render } = await import("enzyme");

    const Comp = (await CompInSrc).default;
    const { getByText } = render(<Comp />);

    expect(getByText("CompInSrc component")).toBeTruthy();

    await waitFor(() => {
      // expect(global.fetch).toBeCalledWith("g");
      expect(getByText(`status is: {"status":123}`)).toBeTruthy();
    });

    cleanup();
  });

  // it("Testing CompInSrc from OptionComp", async function () {
  //   const OptionComponent = (await OptionComp).default;

  //   render(<OptionComponent />);

  //   expect(screen.getByText("OptionComp component")).toBeTruthy();
  //   expect(screen.getByText("CompInSrc component")).toBeTruthy();
  // });
});

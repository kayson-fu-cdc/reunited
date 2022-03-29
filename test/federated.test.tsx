const CompInSrc = import("componentInPackage/CompInSrc");
const OptionComp = import("deltaone/OptionComp");

global.fetch = jest.fn((s) =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 123 }),
  })
);

describe("Federation", function () {
  it("Testing CompInSrc2 from Remote", async function () {
    const React = await import("react");
    const { render, waitFor, cleanup } = await import("@testing-library/react");

    const Comp = (await CompInSrc).default;
    const { getByText } = render(<Comp />);

    expect(getByText("CompInSrc component")).toBeTruthy();

    await waitFor(() => {
      expect(getByText(`status is: {"status":123}`)).toBeTruthy();
    });

    cleanup();
  });

  it("Testing CompInSrc from Remote", async function () {
    const React = await import("react");
    const { render, waitFor, cleanup } = await import("@testing-library/react");

    const Comp = (await CompInSrc).default;
    const { getByText } = render(<Comp />);

    expect(getByText("CompInSrc component")).toBeTruthy();

    await waitFor(() => {
      expect(getByText(`status is: {"status":123}`)).toBeTruthy();
    });

    cleanup();
  });

  it("Testing CompInSrc from OptionComp", async function () {
    const React = await import("react");
    const { render, waitFor, cleanup } = await import("@testing-library/react");
    const OptionComponent = (await OptionComp).default;

    const { getByText } = render(<OptionComponent />);

    expect(getByText("OptionComp component")).toBeTruthy();
    expect(getByText("CompInSrc component")).toBeTruthy();

    await waitFor(() => {
      expect(getByText(`status is: {"status":123}`)).toBeTruthy();
    });
    cleanup();
  });
});

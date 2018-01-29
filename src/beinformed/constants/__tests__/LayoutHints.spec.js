import getHint from "beinformed/constants/LayoutHints";

jest.mock(
  "config/LayoutHintConfig.json",
  () => ({
    EXAMPLE_HINT: {
      hint: "example",
      description: {
        NL: "Render als icoon.",
        EN: "Render as icon."
      },
      link: "",
      component: ["attribute/string"]
    }
  }),
  { virtual: true }
);

describe("LayoutHints", () => {
  it("Should be able retrieve a hint", () => {
    expect(getHint("EXAMPLE_HINT")).toBe("example");
    expect(getHint()).toBe("");
    expect(getHint("NOT_EXISTING")).toBe("");
  });
});

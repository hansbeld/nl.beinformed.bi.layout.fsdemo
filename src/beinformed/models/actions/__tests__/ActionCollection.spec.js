import ActionCollection from "beinformed/models/actions/ActionCollection";

describe("ActionCollection", () => {
  const collectionData = [
    {
      name: "sample",
      method: "GET",
      href: "/list/action",
      fields: [
        {
          name: "id",
          type: "number",
          value: 1
        },
        {
          name: "idNoValue",
          type: "number"
        }
      ]
    },
    {
      name: "sample2",
      method: "POST",
      href: "/list/action2"
    }
  ];
  const collectionContributions = [
    {
      name: "sample",
      label: "Example of an action",
      type: "form",
      fields: [
        {
          id: {
            type: "number",
            label: "ID"
          }
        },
        {
          idNoValue: {
            type: "number",
            label: "IDNOVALUE"
          }
        }
      ]
    },
    {
      name: "sample2",
      label: "Example of an action by layouthint",
      type: "generic",
      layouthint: ["testaction"]
    }
  ];

  it("should be able to create an empty ActionCollection object", () => {
    const actionCollection = new ActionCollection();

    expect(actionCollection instanceof ActionCollection).toBeTruthy();
    expect(actionCollection.length).toBe(0);
  });

  it("should throw an error when action data is available but no contributions", () => {
    expect(() => {
      new ActionCollection(collectionData);
    }).toThrow();
  });

  it("should be able to create an ActionCollection with standard modular ui json", () => {
    const actionCollection = new ActionCollection(
      collectionData,
      collectionContributions
    );

    expect(actionCollection.all.length).toBe(2);
    expect(actionCollection.getActionsByType("form").all.length).toBe(1);
    expect(actionCollection.hasActionsByLayoutHint("testaction")).toBe(true);
    expect(
      actionCollection.getActionsByLayoutHint("testaction").all.length
    ).toBe(1);
  });
});

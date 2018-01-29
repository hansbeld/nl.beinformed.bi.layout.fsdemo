import TimeAttributeModel from "beinformed/models/attributes/TimeAttributeModel";

describe("TimeAttributeModel", () => {
  it("should be able to create an empty TimeAttribute object", () => {
    const attribute = new TimeAttributeModel();

    expect(attribute instanceof TimeAttributeModel).toBe(true);
    expect(attribute.type).toBe("time");
    expect(attribute.format).toBe("HH:mm:ss");
    expect(attribute.getInputValue()).toBe("");
    expect(attribute.inputvalue).toBe("");

    attribute.addConstraints();
    expect(attribute.constraintCollection.length).toBe(1);
  });

  it("should be able to update", () => {
    const attribute = new TimeAttributeModel(
      {},
      {
        format: "HH:mm"
      }
    );

    attribute.update("13:45");
    expect(attribute.getInputValue()).toBe("13:45");
    expect(attribute.getInitialInputValue("13:45:23")).toBe("13:45");

    attribute.update(null);
    expect(attribute.getInputValue()).toBe("");

    attribute.update("aaaa");
    expect(attribute.value).toBe(null);
  });
});

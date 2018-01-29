import TimestampAttributeModel from "beinformed/models/attributes/TimestampAttributeModel";

describe("TimestampAttributeModel", () => {
  it("should be able to create an empty TimestampAttribute object", () => {
    const attribute = new TimestampAttributeModel();

    expect(attribute instanceof TimestampAttributeModel).toBe(true);

    expect(attribute.type).toBe("timestamp");
    expect(attribute.format).toBe("YYYY-MM-DDTHH:mm:ss.SSS");
    expect(attribute.getInputValue()).toBe("");
    expect(attribute.inputvalue).toBe("");
    expect(attribute.readonlyvalue).toBe("");

    attribute.addConstraints();
    expect(attribute.constraintCollection.length).toBe(1);
  });

  it("should be able to update", () => {
    const attribute = new TimestampAttributeModel(
      {},
      {
        format: "dd-MM-yyyy HH:mm"
      }
    );

    attribute.update("18-08-2016 13:45");
    expect(attribute.getInputValue()).toBe("18-08-2016 13:45");
    expect(attribute.getInitialInputValue("2016-08-18T13:45:23.000")).toBe(
      "18-08-2016 13:45"
    );
    expect(attribute.readonlyvalue).toBe("18-08-2016 13:45");

    attribute.update(null);
    expect(attribute.getInputValue()).toBe("");

    attribute.update("aaaa");
    expect(attribute.value).toBe(null);
  });
});

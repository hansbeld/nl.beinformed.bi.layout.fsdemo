import MemoAttributeModel from "beinformed/models/attributes/MemoAttributeModel";

describe("MemoAttributeModel", () => {
  it("should be able to create an empty MemoAttribute object", () => {
    const attribute = new MemoAttributeModel();

    expect(attribute instanceof MemoAttributeModel).toBe(true);
    expect(attribute.type).toBe("memo");
    expect(attribute.rows).toBe(10);
    expect(attribute.formatted).toBe(false);
  });

  it("should be able to create a formatted MemoAttribute object", () => {
    const attribute = new MemoAttributeModel(
      {},
      {
        formatted: true,
        rows: 5
      }
    );

    expect(attribute.rows).toBe(5);
    expect(attribute.formatted).toBe(true);
  });
});

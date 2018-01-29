import MoneyAttributeModel from "beinformed/models/attributes/MoneyAttributeModel";

describe("MoneyAttributeModel", () => {
  it("should be able to create an empty ImageAttribute object", () => {
    const attribute = new MoneyAttributeModel();

    expect(attribute instanceof MoneyAttributeModel).toBe(true);
    expect(attribute.type).toBe("money");
  });

  it("Should have a currency symbol", () => {
    const attribute = new MoneyAttributeModel(
      {},
      {
        currencySymbol: "ƒ"
      }
    );

    expect(attribute.currencySymbol).toBe("ƒ");
    expect(attribute.prefix).toBe("ƒ");
  });
});

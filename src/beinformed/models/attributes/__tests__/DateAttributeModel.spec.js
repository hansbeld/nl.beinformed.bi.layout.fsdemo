import DateAttributeModel from "beinformed/models/attributes/DateAttributeModel";

describe("DateAttributeModel", () => {
  it("should be able to create an empty Attribute object", () => {
    const attribute = new DateAttributeModel();

    expect(attribute instanceof DateAttributeModel).toBeTruthy();
    expect(attribute.key).toBeUndefined();
    expect(attribute.label).toBe("");
    expect(attribute.value).toBe(null);
    expect(attribute.inputvalue).toBe("");
    expect(attribute.type).toBe("date");
    expect(attribute.layouthint.all).toEqual([]);
  });

  it("should create date Attribute from typical modular UI response", () => {
    const stringAttribute = {
      key: "date",
      value: "2010-10-23"
    };

    const dateAttrContribution = {
      label: "Date of birth",
      type: "date",
      mandatory: false,
      format: "dd-MM-yyyy"
    };

    const attribute = new DateAttributeModel(
      stringAttribute,
      dateAttrContribution
    );

    expect(attribute instanceof DateAttributeModel).toBe(true);
    expect(attribute.key).toBe("date");
    expect(attribute.label).toBe("Date of birth");
    expect(attribute.value).toBe("2010-10-23");
    expect(attribute.format).toBe("DD-MM-YYYY");
    expect(attribute.formatLabel).toBe("DD-MM-YYYY");
    expect(attribute.inputvalue).toBe("23-10-2010");
    expect(attribute.type).toBe("date");
    expect(attribute.layouthint.all).toEqual([]);
  });

  it("Can set input", () => {
    const attribute = new DateAttributeModel({});
    attribute.inputvalue = "2010-10-10";

    expect(attribute.readonlyvalue).toBe("2010-10-10");

    attribute.inputvalue = "";
    expect(attribute.readonlyvalue).toBe("");
    expect(attribute.value).toBe(null);
  });

  it("Checks constraints", () => {
    const attribute = new DateAttributeModel({});
    expect(() => {
      attribute.isExactDate();
    }).toThrow();
    expect(() => {
      attribute.isBetweenDates();
    }).toThrow();
    expect(() => {
      attribute.isSameOrAfterMinDate();
    }).toThrow();
    expect(() => {
      attribute.isSameOrBeforeMaxDate();
    }).toThrow();

    expect(() => {
      attribute.isExactDate("");
    }).toThrow();
    expect(() => {
      attribute.isBetweenDates("");
    }).toThrow();
    expect(() => {
      attribute.isSameOrAfterMinDate("");
    }).toThrow();
    expect(() => {
      attribute.isSameOrBeforeMaxDate("");
    }).toThrow();

    let attributeWithConstraints = new DateAttributeModel(
      {},
      {
        mindate: "2010-01-01",
        maxdate: "2010-12-31"
      }
    );

    expect(attributeWithConstraints.constraintCollection.length).toBe(2);

    expect(attributeWithConstraints.isExactDate("2009-01-01")).toBe(false);
    expect(attributeWithConstraints.isExactDate("2010-01-01")).toBe(true);

    expect(attributeWithConstraints.isBetweenDates("2009-02-01")).toBe(false);
    expect(attributeWithConstraints.isBetweenDates("2010-02-01")).toBe(true);
    expect(attributeWithConstraints.isBetweenDates("2011-02-01")).toBe(false);

    expect(attributeWithConstraints.isSameOrAfterMinDate("2009-02-01")).toBe(
      false
    );
    expect(attributeWithConstraints.isSameOrAfterMinDate("2010-01-01")).toBe(
      true
    );
    expect(attributeWithConstraints.isSameOrAfterMinDate("2010-02-01")).toBe(
      true
    );

    expect(attributeWithConstraints.isSameOrBeforeMaxDate("2010-01-01")).toBe(
      true
    );
    expect(attributeWithConstraints.isSameOrBeforeMaxDate("2010-12-31")).toBe(
      true
    );
    expect(attributeWithConstraints.isSameOrBeforeMaxDate("2011-01-01")).toBe(
      false
    );

    attributeWithConstraints = new DateAttributeModel(
      {},
      {
        mindate: "2010-01-01",
        maxdate: "2010-01-01"
      }
    );
    expect(attributeWithConstraints.constraintCollection.length).toBe(2);

    attributeWithConstraints = new DateAttributeModel(
      {},
      {
        mindate: "2010-01-01"
      }
    );
    expect(attributeWithConstraints.constraintCollection.length).toBe(2);

    attributeWithConstraints = new DateAttributeModel(
      {},
      {
        maxdate: "2010-01-01"
      }
    );
    expect(attributeWithConstraints.constraintCollection.length).toBe(2);
  });
});

/* eslint-disable require-jsdoc */
import AttributeCollection from "beinformed/models/attributes/AttributeCollection";
import { isVisibleAttribute } from "beinformed/models/attributes/attributeVisibilityUtil";

describe("attributeVisibilityUtil", () => {
  class MockedCollectionFactory {
    constructor() {
      this._data = [];
      this._contributions = [];
    }

    addControlAttribute(elementid, options = [], suggestion = [], hint = []) {
      this._data.push({
        elementid,
        dynamicschema: options.map(option => ({
          code: option,
          label: option
        })),
        suggestion
      });

      this._contributions.push({
        [elementid]: {
          type: "string",
          enumerated: true,
          multiplechoice: true,
          layouthint: [...hint, "combobox"]
        }
      });
    }

    addDependentAttribute(elementid, hint = []) {
      this._data.push({
        elementid
      });
      this._contributions.push({
        [elementid]: {
          layouthint: hint
        }
      });
    }

    createCollection() {
      return new AttributeCollection(this._data, this._contributions);
    }
  }

  it("Returns visible when no visibility specific hint is set", () => {
    const mockedCollectionFactory = new MockedCollectionFactory();

    mockedCollectionFactory.addControlAttribute(
      "attributeControl",
      ["code1", "code2", "code3", "code4", "code5", "code6"],
      ["code2", "code4", "code6"],
      ["dependent-control: Control A"]
    );
    mockedCollectionFactory.addDependentAttribute("attributeUnknownHint", [
      "unknown-hint"
    ]);
    mockedCollectionFactory.addDependentAttribute(
      "attributeHasNonExistingControl",
      ["show when dependent-control: Control B equals code2"]
    );

    const mockedCollection = mockedCollectionFactory.createCollection();

    const noSpecificHint = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("attributeUnknownHint")
    );

    expect(noSpecificHint).toBe(true);

    const nonExistingControl = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("attributeHasNonExistingControl")
    );

    expect(nonExistingControl).toBe(true);
  });

  it("Returns visible", () => {
    const mockedCollectionFactory = new MockedCollectionFactory();

    mockedCollectionFactory.addControlAttribute(
      "attributeControl",
      ["code1", "code2"],
      ["code2"],
      ["dependent-control: Control A"]
    );
    mockedCollectionFactory.addDependentAttribute("showEqualsSelected", [
      "show when dependent-control: Control A equals code2"
    ]);
    mockedCollectionFactory.addDependentAttribute("hideEqualsNotSelected", [
      "hide when dependent-control: Control A equals code1"
    ]);
    mockedCollectionFactory.addDependentAttribute("showIncludesSelected", [
      "show when dependent-control: Control A includes code2"
    ]);
    mockedCollectionFactory.addDependentAttribute("hideIncludesNotSelected", [
      "hide when dependent-control: Control A includes code1"
    ]);

    mockedCollectionFactory.addDependentAttribute("showNotEqualsSelected", [
      "show when dependent-control: Control A notEquals code1"
    ]);
    mockedCollectionFactory.addDependentAttribute("hideNotEqualsNotSelected", [
      "hide when dependent-control: Control A notEquals code2"
    ]);
    mockedCollectionFactory.addDependentAttribute("showNotIncludesSelected", [
      "show when dependent-control: Control A notIncludes code1"
    ]);
    mockedCollectionFactory.addDependentAttribute(
      "hideNotIncludesNotSelected",
      ["hide when dependent-control: Control A notIncludes code2"]
    );

    const mockedCollection = mockedCollectionFactory.createCollection();

    const showEqualsSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("showEqualsSelected")
    );

    expect(showEqualsSelected).toBe(true);

    const hideEqualsNotSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("hideEqualsNotSelected")
    );

    expect(hideEqualsNotSelected).toBe(true);

    const showIncludesSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("showIncludesSelected")
    );

    expect(showIncludesSelected).toBe(true);

    const hideIncludesNotSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("hideIncludesNotSelected")
    );

    expect(hideIncludesNotSelected).toBe(true);

    const showNotEqualsSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("showNotEqualsSelected")
    );

    expect(showNotEqualsSelected).toBe(true);

    const hideNotEqualsNotSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("hideNotEqualsNotSelected")
    );

    expect(hideNotEqualsNotSelected).toBe(true);

    const showNotIncludesSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("showNotIncludesSelected")
    );

    expect(showNotIncludesSelected).toBe(true);

    const hideNotIncludesNotSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("hideNotIncludesNotSelected")
    );

    expect(hideNotIncludesNotSelected).toBe(true);
  });

  it("Returns hidden", () => {
    const mockedCollectionFactory = new MockedCollectionFactory();

    mockedCollectionFactory.addControlAttribute(
      "attributeControl",
      ["code1", "code2"],
      ["code2"],
      ["dependent-control: Control A"]
    );
    mockedCollectionFactory.addDependentAttribute("showEqualsNotSelected", [
      "show when dependent-control: Control A equals code1"
    ]);
    mockedCollectionFactory.addDependentAttribute("hideEqualsSelected", [
      "hide when dependent-control: Control A equals code2"
    ]);
    mockedCollectionFactory.addDependentAttribute("showIncludesNotSelected", [
      "show when dependent-control: Control A includes code1"
    ]);
    mockedCollectionFactory.addDependentAttribute("hideIncludesSelected", [
      "hide when dependent-control: Control A includes code2"
    ]);

    const mockedCollection = mockedCollectionFactory.createCollection();

    const showEqualsNotSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("showEqualsNotSelected")
    );

    expect(showEqualsNotSelected).toBe(false);

    const hideEqualsSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("hideEqualsSelected")
    );

    expect(hideEqualsSelected).toBe(false);

    const showIncludesNotSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("showIncludesNotSelected")
    );

    expect(showIncludesNotSelected).toBe(false);

    const hideIncludesSelected = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("hideIncludesSelected")
    );

    expect(hideIncludesSelected).toBe(false);
  });

  it("It can handle an attribute that is dependend on an other dependent attribute", () => {
    const mockedCollectionFactory = new MockedCollectionFactory();

    mockedCollectionFactory.addControlAttribute(
      "attributeControlA",
      ["code1", "code2"],
      ["code2"],
      ["dependent-control: Control A"]
    );
    mockedCollectionFactory.addControlAttribute(
      "attributeControlB",
      ["code1", "code2"],
      ["code2"],
      [
        "dependent-control: Control B",
        "show when dependent-control: Control A equals code2"
      ]
    );
    mockedCollectionFactory.addControlAttribute(
      "attributeControlC",
      ["code1", "code2"],
      ["code2"],
      [
        "dependent-control: Control C",
        "show when dependent-control: Control B equals code2"
      ]
    );
    mockedCollectionFactory.addControlAttribute(
      "attributeControlD",
      ["code1", "code2"],
      ["code2"],
      [
        "dependent-control: Control D",
        "show when dependent-control: Control C equals code1"
      ]
    );
    mockedCollectionFactory.addControlAttribute(
      "attributeControlE",
      ["code1", "code2"],
      ["code2"],
      [
        "dependent-control: Control E",
        "show when dependent-control: Control D equals code2"
      ]
    );

    mockedCollectionFactory.addDependentAttribute("show1", [
      "show when dependent-control: Control A equals code2"
    ]);
    mockedCollectionFactory.addDependentAttribute("show2", [
      "show when dependent-control: Control B equals code2"
    ]);
    mockedCollectionFactory.addDependentAttribute("show3", [
      "show when dependent-control: Control C equals code2"
    ]);
    mockedCollectionFactory.addDependentAttribute("show4", [
      "show when dependent-control: Control D equals code2"
    ]);
    mockedCollectionFactory.addDependentAttribute("show5", [
      "show when dependent-control: Control E equals code2"
    ]);

    const mockedCollection = mockedCollectionFactory.createCollection();

    const show1 = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("show1")
    );

    expect(show1).toBe(true);

    const show2 = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("show2")
    );

    expect(show2).toBe(true);

    const show3 = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("show3")
    );

    expect(show3).toBe(true);
    const attributeControlB = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("attributeControlB")
    );

    expect(attributeControlB).toBe(true);

    expect(
      mockedCollection.getAttributeByKey("attributeControlC")
        .isDependentAttribute
    ).toBe(true);
    const attributeControlC = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("attributeControlC")
    );

    expect(attributeControlC).toBe(true);

    const show4 = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("show4")
    );

    expect(show4).toBe(false);

    const show5 = isVisibleAttribute(
      mockedCollection,
      mockedCollection.getAttributeByKey("show5")
    );

    expect(show5).toBe(false);
  });
});

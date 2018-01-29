// eslint-disable no-magic-numbers
import FormCollectionData from "./_FormCollectionData.json";
import FormCollectionContribution from "./_FormCollectionContribution.json";

import AttributeCollection from "beinformed/models/attributes/AttributeCollection";

import TreeFormAttributeContribution from "./_TreeFormAttributeContribution.json";
import TreeFormAttributeData from "./_TreeFormAttributeData.json";

import ListDetailData from "./_ListDetailData.json";
import ListDetailContributions from "./_ListDetailContributions.json";

import ListAttributeData from "./_ListAttributeData.json";
import ListAttributeContributions from "./_ListAttributeContributions.json";

import ActionFieldsData from "./_ActionFieldsData.json";
import ActionFieldsContributions from "./_ActionFieldsContributions.json";

describe("AttributeCollection", () => {
  it("should be able to create an empty AttributeCollection object", () => {
    const attributeCollection = new AttributeCollection();

    expect(attributeCollection instanceof AttributeCollection).toBe(true);
    expect(attributeCollection.all.length).toBe(0);
    expect(attributeCollection.visible.length).toBe(0);
    expect(attributeCollection.getAttributeByKey("not_existing")).toBe(null);
    expect(attributeCollection.getAttributeByLayoutHint("not_existing")).toBe(
      null
    );
    expect(attributeCollection.getDependentChoiceAttribute("")).toBe(null);
  });

  it("can create collection from form data and contributions", () => {
    const attributeCollection = new AttributeCollection(
      FormCollectionData,
      FormCollectionContribution
    );

    expect(attributeCollection instanceof AttributeCollection).toBe(true);
    expect(attributeCollection.size).toBe(31);
    expect(attributeCollection.all.length).toBe(31);
    expect(attributeCollection.visible.length).toBe(31);
    expect(attributeCollection.hasAttributeByKey("Address")).toBe(true);
    expect(
      attributeCollection.getAttributesByLayoutHint("zipcode").length
    ).toBe(2);

    expect(
      attributeCollection.getChoiceAttributeByLayoutHint("combobox").label
    ).toBe("Type");
    expect(attributeCollection.getChoiceAttributeByLayoutHint("bla")).toBe(
      null
    );

    attributeCollection.setReferenceDate("2010-01-01");
    expect(attributeCollection.all[0].referenceDate).toBe("2010-01-01");

    const attr1 = attributeCollection.all[0];
    const key1 = attr1.key;
    const attr2 = attributeCollection.all[0];
    const key2 = attr2.key;
    expect(attributeCollection.all[0].key).toBe(key1);
    attributeCollection.replace(attr1, attr2);
    expect(attributeCollection.all[0].key).toBe(key2);

    attributeCollection.attributes = [attributeCollection.all[0]];
    expect(attributeCollection.length).toBe(1);
  });

  it("can handle list detail data and contributions", () => {
    const attributeCollection = new AttributeCollection(
      ListDetailData,
      ListDetailContributions
    );

    expect(attributeCollection instanceof AttributeCollection).toBe(true);
    expect(attributeCollection.size).toBe(5);
    expect(attributeCollection.all.length).toBe(5);
    expect(attributeCollection.visible.length).toBe(5);
    // not metadata
    expect(attributeCollection.hasAttributeByKey("CaseName")).toBe(false);

    // attribute
    expect(attributeCollection.hasAttributeByKey("ISBN10")).toBe(true);

    expect(attributeCollection.getAttributeByKey("ISBN10").value).toBe(
      "1847087302"
    );
  });

  it("can create an attribute collection from list item data and contributions", () => {
    const attributeCollection = new AttributeCollection(
      ListAttributeData,
      ListAttributeContributions
    );

    expect(attributeCollection instanceof AttributeCollection).toBe(true);
    expect(attributeCollection.size).toBe(6);
    expect(attributeCollection.all.length).toBe(6);
    expect(attributeCollection.visible.length).toBe(6);
    expect(attributeCollection.hasAttributeByKey("Title")).toBe(true);
    expect(
      attributeCollection.getAttributesByLayoutHint("combobox").length
    ).toBe(1);
  });

  it("can handle actions fields data and contributions", () => {
    const attributeCollection = new AttributeCollection(
      ActionFieldsData,
      ActionFieldsContributions
    );

    expect(attributeCollection instanceof AttributeCollection).toBe(true);
    expect(attributeCollection.size).toBe(1);
    expect(attributeCollection.all.length).toBe(1);
    expect(attributeCollection.getAttributeByKey("ID").value).toBe(26);
  });

  it("can replace the complete collection with an other collection", () => {
    const data = FormCollectionData;

    const contributions = FormCollectionContribution;

    const attributeCollection = new AttributeCollection(data, contributions);

    expect(attributeCollection.length).toBe(31);

    const contributions2 = [
      {
        TimestampRange: {
          label: "Timestamp range",
          type: "range",
          mandatory: false,
          children: [
            {
              BeginTimestamp: {
                label: "Begin",
                type: "datetime",
                mandatory: true,
                format: "dd-MM-yyyy HH:mm:ss.SSS"
              }
            },
            {
              EndTimestamp: {
                label: "End",
                type: "datetime",
                mandatory: true,
                format: "dd-MM-yyyy HH:mm:ss.SSS"
              }
            }
          ]
        }
      }
    ];

    const attributeCollection2 = new AttributeCollection(
      FormCollectionData,
      contributions2
    );

    attributeCollection.collection = attributeCollection2.collection;

    expect(attributeCollection.length).toBe(1);
  });
  //
  // it("can handle tree form attribute structures", () => {
  //   const attributeCollection = new AttributeCollection(
  //     TreeFormAttributeData,
  //     TreeFormAttributeContribution
  //   );
  //
  //   expect(attributeCollection.length).toBe(1);
  // });
});

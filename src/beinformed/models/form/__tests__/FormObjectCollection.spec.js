import FormContributionsJSON from "./FormContributions.json";

import FormObjectCollection from "beinformed/models/form/FormObjectCollection";
import FormObjectModel from "beinformed/models/form/FormObjectModel";

describe("FormObjectCollection", () => {
  it("should be able to create an empty FormObjectCollection object", () => {
    const formObjects = new FormObjectCollection();

    expect(formObjects instanceof FormObjectCollection).toBe(true);
  });

  it("can create a FormObjectCollection from modular ui response", () => {
    const formObjects = new FormObjectCollection(
      [
        {
          objectid: "Person",
          elements: [
            { elementid: "Name" },
            { elementid: "DateOfBirth" },
            { elementid: "DateOfDeath" }
          ]
        }
      ],
      FormContributionsJSON.objects
    );

    expect(formObjects.get("Person").key).toBe("Person");
    expect(formObjects.attributeCount).toBe(3);
    expect(formObjects.hasRepeatableObject).toBe(false);
    expect(() => {
      formObjects.getObject("Person");
    }).toThrow();

    const personObject = new FormObjectModel(
      {
        objectid: "Person",
        elements: [
          { elementid: "Name" },
          { elementid: "DateOfBirth" },
          { elementid: "DateOfDeath" }
        ]
      },
      FormContributionsJSON.objects.Person
    );

    expect(formObjects.getObject(personObject).key).toBe("Person");
  });

  it("Can handle errors", () => {
    const objectCollection = new FormObjectCollection({});

    expect(objectCollection.errorCollection.length).toBe(0);
    expect(objectCollection.hasServerErrors()).toBe(false);

    objectCollection.resetErrors();
    expect(objectCollection.hasServerErrors()).toBe(false);

    objectCollection.errorCollection.addServerError("TEST");
    expect(objectCollection.errorCollection.length).toBe(1);
    expect(objectCollection.hasServerErrors()).toBe(true);

    objectCollection.resetErrors();
    expect(objectCollection.hasServerErrors()).toBe(false);
  });
});

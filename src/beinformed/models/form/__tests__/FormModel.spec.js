import FormContributionsJSON from "./FormContributions.json";
import FormModel from "beinformed/models/form/FormModel";
import Parameter from "beinformed/models/href/Parameter";
import ErrorResponse from "beinformed/models/error/ErrorResponse";
import FetchError from "beinformed/utils/fetch/FetchError";

describe("FormModel", () => {
  it("should be able to create an empty FormModel object", () => {
    const form = new FormModel({});

    expect(form instanceof FormModel).toBe(true);
    expect(form.type).toBe("Form");
    expect(form.getInitialChildModelLinks().length).toBe(0);

    expect(form.missingObjects.length).toBe(0);
    expect(form.completeObjects.length).toBe(0);
    expect(form.neededAttributes).toBe(0);
    expect(form.hasNextStep).toBe(false);
    expect(form.hasPreviousStep).toBe(false);
    expect(form.isValid).toBe(true);
    expect(form.hasServerErrors()).toBe(false);

    expect(() => {
      const self = form.selfhref;
    }).toThrow();
  });

  it("should be able to create a FormModel from missing information", () => {
    const firstMissingJSON = {
      _links: {},
      missing: {
        anchors: [
          {
            objectid: "Person",
            elements: [
              { elementid: "Name" },
              { elementid: "DateOfBirth" },
              { elementid: "DateOfDeath" }
            ]
          }
        ]
      }
    };

    const formData = {
      data: firstMissingJSON,
      contributions: FormContributionsJSON
    };

    const form = new FormModel(formData);

    expect(FormModel.isApplicableModel(formData)).toBe(true);

    expect(form instanceof FormModel).toBe(true);

    expect(form.missingObjects.length).toBe(1);
    expect(form.errorCollection.length).toBe(0);

    expect(form.label).toBe("Create person");
    expect(form.isChanged()).toBe(false);

    form.missingObjects.all[0].attributeCollection.all[0].update("test");
    expect(form.isChanged()).toBe(true);

    expect(form.neededAttributes).toBe(33);
    expect(form.hasNextStep).toBe(true);
  });

  it("should be able to create a FormModel from missing error information", () => {
    const secondMissingJSON = {
      _links: {},
      missing: {
        anchors: [
          {
            objectid: "Person",
            elementid: "Name"
          }
        ]
      }
    };

    const form = new FormModel({
      data: secondMissingJSON,
      contributions: FormContributionsJSON
    });

    expect(form instanceof FormModel).toBe(true);

    expect(form.missingObjects.length).toBe(1);
    expect(form.errorCollection.length).toBe(0);
  });

  it("should be able to create a FormModel from error information", () => {
    const errorJSON = {
      _links: {},
      errors: [
        {
          anchor: {
            objectid: "Person",
            elementid: "DateOfBirth"
          },
          id: "INVALID_DATE_FORMAT",
          properties: {
            format: "yyyy-MM-dd"
          }
        }
      ]
    };

    const form = new FormModel({
      data: errorJSON,
      contributions: FormContributionsJSON
    });

    expect(form instanceof FormModel).toBe(true);

    expect(form.missingObjects.length).toBe(0);
    expect(form.errorCollection.length).toBe(0);
  });

  it("should be able to update an existing form model with error information", () => {
    const mainForm = new FormModel({
      data: {
        _links: {},
        missing: {
          anchors: [
            {
              objectid: "Person",
              elements: [
                { elementid: "Name" },
                { elementid: "DateOfBirth" },
                { elementid: "DateOfDeath" }
              ]
            }
          ]
        }
      },
      contributions: FormContributionsJSON
    });

    const formWithMissingError = new FormModel({
      data: {
        _links: {},
        missing: {
          anchors: [
            {
              objectid: "Person",
              elementid: "Name"
            }
          ]
        }
      },
      contributions: FormContributionsJSON
    });

    const updatedForm = mainForm.update(formWithMissingError);

    expect(updatedForm instanceof FormModel).toBe(true);
    expect(updatedForm.missingObjects.length).toBe(1);
    expect(updatedForm.isValid).toBe(false);

    const formWithErrors = new FormModel({
      data: {
        _links: {},
        errors: [
          {
            anchor: {
              objectid: "Person",
              elementid: "DateOfBirth"
            },
            id: "INVALID_DATE_FORMAT",
            properties: {
              format: "yyyy-MM-dd"
            }
          }
        ]
      },
      contributions: FormContributionsJSON
    });

    const errorForm = mainForm.update(formWithErrors);

    expect(updatedForm instanceof FormModel).toBe(true);
    expect(updatedForm.missingObjects.length).toBe(1);
    expect(updatedForm.isValid).toBe(false);
  });

  it("Can set parameters", () => {
    const form = new FormModel({});

    expect(form.isFinished).toBe(false);
    expect(form.successRedirect).toBe(null);

    form.parameters = [new Parameter(null, "name", "value")];
    expect(form.parameters.length).toBe(1);
  });

  it("Can handle success response", () => {
    const form = new FormModel({
      data: {
        success: {
          redirect: "/endredirect"
        }
      }
    });

    expect(form.isFinished).toBe(true);
    expect(form.successRedirect.path).toBe("/endredirect");
  });

  it("Should be able to handle xhr server errors", () => {
    const form = new FormModel({});

    form.addServerError(
      new ErrorResponse(
        new FetchError({
          error: {
            id: "GENERAL_ERROR",
            parameters: {
              type: "ErrorType"
            }
          }
        })
      )
    );

    expect(form.errorCollection.length).toBe(1);
  });

  it("Should be able to handle errors on attributes", () => {
    const firstMissingJSON = {
      _links: {},
      missing: {
        anchors: [
          {
            objectid: "Person",
            elements: [
              { elementid: "Name" },
              { elementid: "DateOfBirth" },
              { elementid: "DateOfDeath" }
            ]
          }
        ]
      }
    };

    const form = new FormModel({
      data: firstMissingJSON,
      contributions: FormContributionsJSON
    });

    form.handleErrors({
      data: {
        errors: [
          {
            id: "Form Error"
          },
          {
            id: "Anchor No Object Error",
            anchor: {
              elementid: "Person"
            }
          },
          {
            id: "Form.mandatory",
            anchor: {
              objectid: "Person",
              elementid: "Name"
            }
          }
        ]
      }
    });

    expect(form.errorCollection.length).toBe(1);
  });

  it("Can handle missing responses", () => {
    const firstMissingJSON = {
      _links: {},
      missing: {
        anchors: [
          {
            objectid: "Person",
            elements: [
              { elementid: "Name" },
              { elementid: "DateOfBirth" },
              { elementid: "DateOfDeath" }
            ]
          }
        ]
      }
    };

    const form = new FormModel({
      data: firstMissingJSON,
      contributions: FormContributionsJSON
    });

    const isNewObject = form.hasNewObject([
      {
        objectid: "Person",
        elementid: "Name"
      }
    ]);

    expect(isNewObject).toBe(false);

    const isNewObject2 = form.hasNewObject([
      {
        objectid: "Person",
        elementid: "NonExisting2"
      }
    ]);
    expect(isNewObject2).toBe(true);

    const isNewObject3 = form.hasNewObject([
      {
        objectid: "NonExisting",
        elementid: "NonExisting"
      }
    ]);

    expect(isNewObject3).toBe(true);
  });

  it("is able to update missing form response, mandatory server", () => {
    const firstMissingJSON = {
      _links: {},
      missing: {
        anchors: [
          {
            objectid: "Person",
            elements: [
              { elementid: "Name" },
              { elementid: "DateOfBirth" },
              { elementid: "DateOfDeath" }
            ]
          }
        ]
      }
    };

    const form = new FormModel({
      data: firstMissingJSON,
      contributions: FormContributionsJSON
    });

    const secondMissingJSON = {
      _links: {},
      missing: {
        anchors: [
          {
            objectid: "Person",
            elementid: "Name"
          },
          {
            objectid: "Person",
            elementid: "DateOfBirth"
          }
        ]
      }
    };

    const nextForm = new FormModel({
      data: secondMissingJSON,
      contributions: FormContributionsJSON
    });

    const updatedForm = form.update(nextForm);

    expect(updatedForm.completeObjects.length).toBe(0);
    expect(updatedForm.missingObjects.length).toBe(1);
  });

  it("Is able to update from new form response", () => {
    const firstMissingJSON = {
      _links: {},
      missing: {
        anchors: [
          {
            objectid: "Person",
            elements: [
              { elementid: "Name" },
              { elementid: "DateOfBirth" },
              { elementid: "DateOfDeath" }
            ]
          }
        ]
      }
    };

    const form = new FormModel({
      data: firstMissingJSON,
      contributions: FormContributionsJSON
    });

    const secondMissingJSON = {
      _links: {},
      missing: {
        anchors: [
          {
            objectid: "Details",
            elements: [{ elementid: "Address" }]
          }
        ]
      }
    };

    const nextForm = new FormModel({
      data: secondMissingJSON,
      contributions: FormContributionsJSON
    });

    const updatedForm = form.update(nextForm);

    expect(form.hasNextStep).toBe(true);
    expect(updatedForm.completeObjects.length).toBe(1);
    expect(updatedForm.missingObjects.length).toBe(1);

    const finishForm = new FormModel({
      data: {
        success: {
          redirect: "/endredirect"
        }
      },
      contributions: FormContributionsJSON
    });

    form.update(finishForm);

    expect(form.completeObjects.length).toBe(2);
    expect(form.missingObjects.length).toBe(0);

    form.setPreviousObject();
    expect(form.completeObjects.length).toBe(1);
    expect(form.missingObjects.length).toBe(1);
    expect(form.hasNextStep).toBe(false);

    form.setNextObject();
    expect(form.completeObjects.length).toBe(2);
    expect(form.missingObjects.length).toBe(0);
  });

  it("is able to get formdata for request", () => {
    const firstMissingJSON = {
      _links: {},
      missing: {
        anchors: [
          {
            objectid: "Person",
            elements: [
              { elementid: "Name" },
              { elementid: "DateOfBirth" },
              { elementid: "DateOfDeath" }
            ]
          }
        ]
      }
    };

    const form = new FormModel({
      data: firstMissingJSON,
      contributions: FormContributionsJSON
    });

    expect(form.formdata).toBe(
      JSON.stringify({
        objects: [
          {
            Person: {
              Name: null,
              DateOfBirth: null,
              DateOfDeath: null
            }
          }
        ]
      })
    );

    const nextForm = new FormModel({
      data: {
        _links: {},
        missing: {
          anchors: [
            {
              objectid: "Details",
              index: 1,
              elements: [{ elementid: "Address" }]
            }
          ]
        }
      },
      contributions: FormContributionsJSON
    });

    const updatedForm = form.update(nextForm);

    expect(updatedForm.formdata).toBe(
      JSON.stringify({
        objects: [
          {
            Person: {
              Name: null,
              DateOfBirth: null,
              DateOfDeath: null
            }
          },
          {
            Details: {
              Address: null
            }
          }
        ]
      })
    );

    const thirdForm = new FormModel({
      data: {
        _links: {},
        missing: {
          anchors: [
            {
              objectid: "Details",
              index: 2,
              elements: [{ elementid: "Address" }]
            }
          ]
        }
      },
      contributions: FormContributionsJSON
    });

    const updatedFormSecondIteration = updatedForm.update(thirdForm);

    expect(updatedFormSecondIteration.formdata).toBe(
      JSON.stringify({
        objects: [
          { Person: { Name: null, DateOfBirth: null, DateOfDeath: null } },
          { Details: { Address: null } },
          { Details: { Address: null } }
        ]
      })
    );
  });
});

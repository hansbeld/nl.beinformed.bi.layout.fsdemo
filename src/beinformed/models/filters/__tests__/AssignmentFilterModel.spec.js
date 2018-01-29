import AssignmentFilterModel from "beinformed/models/filters/AssignmentFilterModel";

import LookupAttributeModel from "beinformed/models/attributes/LookupAttributeModel";
import ChoiceAttributeModel from "beinformed/models/attributes/ChoiceAttributeModel";

describe("AssignmentFilterModel", () => {
  let filterData;
  let filterContributions;

  beforeEach(() => {
    filterData = {
      name: "Assignments",
      USERKEY: {
        param: "USERKEY",
        name: "USERKEY",
        _links: {
          lookupservice: {
            href:
              "/lookupOptions?lookupToken=bd3a293d-ec55-4644-b5cd-7182a105bd94"
          }
        }
      },
      ASSIGNMENTTYPE: {
        param: "ASSIGNMENTTYPE",
        name: "ASSIGNMENTTYPE",
        options: [
          {
            key: "Practitioner"
          }
        ]
      }
    };
    filterContributions = {
      type: "assignmentfilter",
      label: "Assignments",
      layouthint: [],
      USERKEY: {
        type: "choicefilter",
        label: "User id",
        layouthint: ["checkbox"],
        multiplechoice: true,
        enumerated: true,
        options: []
      },
      ASSIGNMENTTYPE: {
        type: "choicefilter",
        label: "Type",
        layouthint: ["checkbox"],
        multiplechoice: true,
        enumerated: true,
        options: [
          {
            key: "Practitioner",
            label: "Practitioner"
          }
        ]
      }
    };
  });

  it("creating an AssignmentFilterModel without data should throw", () => {
    expect(() => new AssignmentFilterModel()).toThrow();
  });

  it("should be able to create an AssignmentFilterModel", () => {
    const assignmentFilter = new AssignmentFilterModel(
      filterData,
      filterContributions
    );

    expect(assignmentFilter instanceof AssignmentFilterModel).toBe(true);
    expect(assignmentFilter.user instanceof LookupAttributeModel).toBe(true);
    expect(
      assignmentFilter.assignmenttype instanceof ChoiceAttributeModel
    ).toBe(true);

    expect(assignmentFilter.assignmenttype.options.size).toBe(1);
  });
});

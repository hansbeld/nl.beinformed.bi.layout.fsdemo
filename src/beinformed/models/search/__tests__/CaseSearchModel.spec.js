import CaseSearchModel from "beinformed/models/search/CaseSearchModel";

describe("CaseSearchModel", () => {
  it("should be able to create an empty CaseSearchModel object", () => {
    const caseSearch = new CaseSearchModel({});

    expect(caseSearch instanceof CaseSearchModel).toBe(true);
    expect(caseSearch.getQuickSearchFilters().length).toBe(0);
  });
});

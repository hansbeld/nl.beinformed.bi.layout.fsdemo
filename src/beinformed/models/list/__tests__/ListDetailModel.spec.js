import ListDetailModel from "beinformed/models/list/ListDetailModel";

describe("ListDetailModel", () => {
  it("should be able to create an instance of ListDetailModel", () => {
    const listDetail = new ListDetailModel();

    expect(listDetail instanceof ListDetailModel).toBe(true);
  });
});

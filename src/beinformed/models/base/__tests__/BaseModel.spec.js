import BaseModel from "beinformed/models/base/BaseModel";
import mockWebapp from "./webapp.json";

import LayoutHintCollection from "beinformed/models/layouthint/LayoutHintCollection";

describe("BaseModel", () => {
  it("should be able to create an empty BaseModel object", () => {
    const model = new BaseModel();

    expect(model.data).toEqual({});
    expect(model.contributions).toEqual({});
    expect(model.hasData).toBe(false);

    expect(model.clone()).toEqual(model);
  });

  it("should handle data without contributions", () => {
    const model = new BaseModel(mockWebapp.Webapp);

    expect(model instanceof BaseModel).toBeTruthy();
    expect(model.contributions).toEqual({});
    expect(model.clone()).toEqual(model);
  });

  it("should handle data with wrong contributions", () => {
    const wrongContributionResult = {
      data: {}
    };

    const model = new BaseModel(mockWebapp.Webapp, wrongContributionResult);

    expect(model instanceof BaseModel).toBeTruthy();
  });

  it("should be able to get and set layouthints", () => {
    const model = new BaseModel();

    expect(model.layouthint instanceof LayoutHintCollection).toBe(true);
    expect(model.layouthint.all).toEqual([]);

    model.layouthint = ["test-hint"];
    expect(model.layouthint.first).toBe("test-hint");
  });
});

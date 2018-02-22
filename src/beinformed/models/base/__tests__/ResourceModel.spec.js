/* eslint-disable no-unused-vars */

import ModularUIResponse from "beinformed/modularui/ModularUIResponse";

import ResourceModel from "beinformed/models/base/ResourceModel";
import LinkCollection from "beinformed/models/links/LinkCollection";

import mockWebapp from "./webapp.json";

describe("ResourceModel", () => {
  let modUIResponse;
  beforeEach(() => {
    modUIResponse = new ModularUIResponse();
  });

  it("should be able to create an empty ResourceModel object", () => {
    expect(() => {
      ResourceModel.isApplicableModel();
    }).toThrow();

    const model = new ResourceModel();

    expect(model.data).toEqual({});
    expect(model.contributions).toEqual({});

    expect(model.key).toBe("unknown");

    expect(model.links instanceof LinkCollection).toBe(true);
    expect(model.links.isEmpty).toBe(true);

    expect(() => {
      const selflink = model.selflink;
    }).toThrow();
    expect(() => {
      const selfhref = model.selfhref;
    }).toThrow();
    expect(() => {
      model.type;
    }).toThrow();

    expect(Array.isArray(model.getInitialChildModelLinks())).toBe(true);
    expect(model.childModels.length).toBe(0);
    expect(model.locale).toBe("EN");
  });

  it("should handle data without contributions", () => {
    modUIResponse.data = mockWebapp.webapplication;

    const model = new ResourceModel(modUIResponse);

    expect(model instanceof ResourceModel).toBe(true);
    expect(model.contributions).toEqual({});
    expect(model.selflink.href.path).toBe("/");
  });

  it("should handle data with contributions", () => {
    const goodContributionResult = {
      resourcetype: "Application"
    };
    modUIResponse.data = mockWebapp.webapplication;
    modUIResponse.contributions = goodContributionResult;

    const model = new ResourceModel(modUIResponse);

    expect(model instanceof ResourceModel).toBeTruthy();
    expect(model.resourcetype).toBe("Application");
  });

  it("should handle data with wrong contributions", () => {
    const wrongContributionResult = {
      bla: {}
    };
    modUIResponse.data = mockWebapp.webapplication;
    modUIResponse.contributions = wrongContributionResult;

    const model = new ResourceModel(modUIResponse);

    expect(model instanceof ResourceModel).toBeTruthy();
  });

  it("can handle request information", () => {
    const modelWithoutLocale = new ResourceModel(modUIResponse);
    expect(modelWithoutLocale.locale).toBe("EN");

    modUIResponse.locale = "nl";
    const modelWithLocale = new ResourceModel(modUIResponse);

    expect(modelWithLocale.locale).toBe("nl");
  });

  it("Childmodels should return same model", () => {
    const model = new ResourceModel();
    expect(model.addChildModels([])).toBe(model);
  });
});

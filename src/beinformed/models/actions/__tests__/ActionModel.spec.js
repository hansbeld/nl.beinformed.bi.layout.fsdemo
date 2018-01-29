import ActionModel from "beinformed/models/actions/ActionModel";
import Href from "beinformed/models/href/Href";

import ModularuiResponse from "beinformed/utils/modularui/ModularUIResponse";

describe("ActionModel", () => {
  it("should be able to create an empty ActionModel object", () => {
    const action = new ActionModel();

    expect(action instanceof ActionModel).toBe(true);
    expect(action.method).toBe("POST");
    expect(action.type).toBe("general");
    expect(action.name).toBe("unknown");
    expect(action.key).toBeUndefined();
    expect(action.label).toBeUndefined();
    expect(action.icon).toBe("");
  });

  test.skip("should be able to create a new ActionModel from standard mod ui", () => {
    const moduiResponse = new ModularuiResponse();
    moduiResponse.data = {
      name: "sample",
      method: "GET",
      href: "/list/action",
      fields: [
        {
          name: "id",
          type: "number",
          value: 1
        },
        {
          name: "idNoValue",
          type: "number"
        }
      ]
    };

    moduiResponse.contributions = {
      name: "sample",
      label: "Example of an action",
      type: "form",
      fields: [
        {
          id: {
            type: "number",
            label: "ID"
          }
        },
        {
          idNoValue: {
            type: "number",
            label: "IDNOVALUE"
          }
        }
      ]
    };

    const action = new ActionModel(moduiResponse);

    expect(action.selfhref).toEqual(new Href("/list/action?id=1"));
    expect(action.method).toBe("GET");
    expect(action.type).toBe("form");
    expect(action.name).toBe("sample");
    expect(action.fields.length).toBe(2);
    expect(action.fieldCollection.all.length).toBe(2);
    expect(action.querystring).toBe("id=1");
    expect(action.getFieldByKey("id").value).toBe(1);
    expect(action.getFieldByKey("idNoValue").value).toBe(null);

    expect(action.hasFieldByKey("id")).toBe(true);
    expect(action.hasFieldByKey("unknown")).toBe(false);

    expect(action.key).toBe("sample");
    expect(action.label).toBe("Example of an action");

    expect(action.icon).toBe("");

    action.layouthint.add("icon-thumbs-down");
    expect(action.icon).toBe("thumbs-down");

    action.icon = "thumbs-up";
    expect(action.icon).toBe("thumbs-up");
  });
});

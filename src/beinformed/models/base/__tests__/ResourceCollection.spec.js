import ResourceCollection from "beinformed/models/base/ResourceCollection";
import ResourceModel from "beinformed/models/base/ResourceModel";

describe("ResourceCollection", () => {
  it("should be able get child model links and add childmodels", () => {
    class TestModel extends ResourceModel<any, any> {
      constructor() {
        super({});

        this._childs = [];
      }

      getInitialChildModelLinks() {
        return ["link1", "link2"];
      }

      setChildModels(models) {
        this._childs = models;
      }

      getChilds() {
        return this._childs;
      }
    }

    const testModel = new TestModel();
    const collection = new ResourceCollection([]);

    expect(collection.getInitialChildModelLinks()).toEqual([]);

    collection.collection = [testModel];

    expect(collection.getInitialChildModelLinks()).toEqual(["link1", "link2"]);

    collection.setChildModels(["model1"]);
    expect(collection.first.getChilds()).toEqual(["model1"]);
  });
});

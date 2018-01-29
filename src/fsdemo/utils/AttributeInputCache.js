// @flow
import Cache from "beinformed/utils/browser/Cache";

const storeAttributeInput = (form: FormModel) => {
  const attributeInputCache = Cache.getItem("ATTRIBUTE_INPUT_CACHE") || {};

  if (typeof attributeInputCache === "object") {
    form.missingObjects.all.forEach(missingObject => {
      missingObject.attributeCollection
        .filter(attribute => attribute.value !== null)
        .forEach(attribute => {
          attributeInputCache[attribute.key] = attribute.inputvalue;
        });
    });

    form.allEndResultObjects.all.forEach(resultObject => {
      resultObject.attributeCollection.all.forEach(attribute => {
        attributeInputCache[attribute.key] = attribute.inputvalue;
      });
    });

    Cache.addItem("ATTRIBUTE_INPUT_CACHE", attributeInputCache);
  }
};

const retrieveAttributeInput = (attributeKey: string) => {
  const attributeInputCache = Cache.getItem("ATTRIBUTE_INPUT_CACHE") || {};

  if (typeof attributeInputCache === "object") {
    if (attributeKey in attributeInputCache) {
      return attributeInputCache[attributeKey];
    }
  }

  return null;
};

export { storeAttributeInput, retrieveAttributeInput };

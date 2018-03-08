// @flow
import { get } from "lodash";

import type {
  ContentConfigurationElements,
  ChoiceAttributeOptionModel
} from "beinformed/models";

const getChoiceOptionLabel = (
  option: ChoiceAttributeOptionModel,
  optionContentConfiguration?: ContentConfigurationElements
) => {
  const configuredLabelProperties = get(
    optionContentConfiguration,
    "labelConfig[0].types",
    []
  );

  if (option.concept && configuredLabelProperties.length > 0) {
    const configuredLabels = option.concept
      .getLabelElementByIds(configuredLabelProperties)
      .filter(
        configuredLabel => configuredLabel.value && configuredLabel.value !== ""
      );

    if (configuredLabels.length > 0) {
      const configLabelProperty = configuredLabelProperties
        .filter(
          configuredLabelProperty =>
            typeof configuredLabels.find(
              configuredLabel => configuredLabel._id === configuredLabelProperty
            ) !== "undefined"
        )
        .map(configuredLabelProperty =>
          configuredLabels.find(
            configuredLabel => configuredLabel._id === configuredLabelProperty
          )
        )[0].value;

      return option.count === null
        ? configLabelProperty
        : `${configLabelProperty} (${option.count})`;
    }
  }

  return option.count === null
    ? option.label
    : `${option.label} (${option.count})`;
};

export { getChoiceOptionLabel };

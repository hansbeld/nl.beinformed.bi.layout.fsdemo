// @flow
import type ChoiceAttributeOptionModel from "beinformed/models/attributes/ChoiceAttributeOptionModel";
import type ContentConfigurationElements from "beinformed/models/contentconfiguration/ContentConfigurationElements";

const getChoiceOptionLabel = (
  option: ChoiceAttributeOptionModel,
  optionContentConfiguration?: ContentConfigurationElements
) => {
  const configuredLabelProperties =
    optionContentConfiguration &&
    optionContentConfiguration.labelConfig.length > 0
      ? optionContentConfiguration.labelConfig[0].types
      : [];

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

      return option.count
        ? `${configLabelProperty} (${option.count})`
        : configLabelProperty;
    }
  }

  return option.count ? `${option.label} (${option.count})` : option.label;
};

export { getChoiceOptionLabel };

// @flow
import type ListHeaderModel from "beinformed/models/list/ListHeaderModel";

type SortOptionType = {
  key: string,
  value: string,
  label: string,
  context: ContextContributionsJSON | null
};

/**
 * Defines a sorting object
 */
export default class SortingModel {
  _contexts: Array<ContextContributionsJSON>;
  _options: Array<SortOptionType>;
  _value: Object[];

  /**
   * constructor
   */
  constructor(
    sorting: string,
    contributions: SortingContributionsJSON,
    headers: Array<ListHeaderModel> = [],
    contexts: Array<ContextContributionsJSON> = []
  ) {
    this._contexts = contexts;
    this._options = this.setOptions(contributions, headers);

    this.value = sorting;
  }

  /**
   * Getting value
   */
  get value(): Object[] {
    return this._value;
  }

  /**
   * Set sort value
   * @param  {string} sorting - Sort value
   */
  set value(sorting: string) {
    if (typeof sorting === "undefined") {
      this._value = [];
    } else {
      this._value = sorting
        .split(",")
        .filter(sortOption => {
          const key = sortOption.includes(" ")
            ? sortOption.split(" ")[0]
            : sortOption;

          return this.getOptionByKey(key) !== null;
        })
        .map(sortOption => {
          const key = sortOption.includes(" ")
            ? sortOption.split(" ")[0]
            : sortOption;
          const sortorder = sortOption.includes(" ")
            ? sortOption.split(" ")[1]
            : "";

          // check if sort option is selectable in sort list
          const value = this.getOptionByKey(key);

          return {
            ...value,
            order: sortorder
          };
        });
    }
  }

  /**
   * Getting the name
   */
  get name(): string {
    return "sort";
  }

  /**
   * Get sort option by key
   */
  getOptionByKey(key: string): SortOptionType | null {
    return this._options.find(option => option.key === key) || null;
  }

  /**
   * Set initial available sorting options
   */
  setOptions(
    contributions: SortingContributionsJSON,
    headers: ListHeaderModel[]
  ) {
    return contributions && contributions.attributes
      ? contributions.attributes.map(option => {
          const headerInfo = headers.find(header => header.key === option);

          // initial option
          const returnOption = {
            key: option,
            value: option,
            label: option,
            context: {}
          };

          if (headerInfo) {
            returnOption.label = headerInfo.label;
          } else {
            this._contexts.forEach(context => {
              if (context.attributes) {
                const attr = context.attributes.find(attribute =>
                  attribute.hasOwnProperty(option)
                );

                if (attr) {
                  returnOption.label = attr[option].label;
                  returnOption.context = context;
                }
              }
            });
          }

          return returnOption;
        })
      : [];
  }

  /**
   * Getting sort options
   */
  get options(): Object[] {
    return this._options;
  }

  /**
   * Getting param value
   */
  get param(): string {
    return this.value && this.value.length > 0
      ? this.value.map(value => `${value.value} ${value.order}`).join(",")
      : "";
  }
}

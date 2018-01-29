// @flow
import LinkCollection from "beinformed/models/links/LinkCollection";
import ResourceModel from "beinformed/models/base/ResourceModel";
import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import type LinkModel from "beinformed/models/links/LinkModel";
import type ModularUIResponse from "beinformed/utils/modularui/ModularUIResponse";
import { TIMEVERSION_FILTER_NAME } from "beinformed/constants/Constants";
import FilterCollection from "beinformed/models/filters/FilterCollection";
/**
 * Related concepts
 */
class RelatedConceptsModel extends ResourceModel {
  _concepts: ConceptDetailModel[];
  _filterCollection: ?FilterCollection;

  /**
   * @override
   */
  constructor(modularuiResponse: ModularUIResponse) {
    super(modularuiResponse);

    this._concepts = [];
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "RelatedConcepts";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      data.contributions.resourcetype === "relatedConcepts"
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    return this.conceptLinks.all.map(conceptLink => {
      const href = conceptLink.href;

      href.addParameter("entryDate", this.entryDate);

      conceptLink.href = href;

      return conceptLink;
    });
  }

  /**
   * @override
   */
  setChildModels() {
    this._concepts = this.childModels.filter(
      model => model.type === "List" || model.type === "ConceptDetail"
    );
  }

  /**
   * Retrieve available filters on concept toc
   */
  get filterCollection(): FilterCollection {
    if (!this._filterCollection) {
      this._filterCollection = new FilterCollection(
        {
          entryDate: this.data.filter.datefilter
        },
        {
          filter: [
            {
              entryDate: {
                format: "dd-MM-yyyy",
                label: "Entry date",
                type: "datefilter"
              }
            }
          ]
        }
      );
    }

    return this._filterCollection;
  }

  /**
   * Retrieve entrydate of content toc
   */
  get entryDate(): string | null {
    const entryDateFilter = this.filterCollection.getFilterByAttributeKey(
      TIMEVERSION_FILTER_NAME
    );
    if (entryDateFilter) {
      return entryDateFilter.attribute.value;
    }

    return null;
  }

  /**
   * Retrieve concept links related to content
   */
  get conceptLinks(): LinkCollection {
    return this.links.getLinksByGroup("concepts");
  }

  /**
   * Retrieve a sorted array of related concept models
   */
  get concepts(): ConceptDetailModel[] {
    return this._concepts.sort((a, b) => {
      if (a.label < b.label) {
        return -1;
      }
      if (a.label > b.label) {
        return 1;
      }

      return 0;
    });
  }
}

export default RelatedConceptsModel;

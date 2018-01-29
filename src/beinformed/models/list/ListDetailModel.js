// @flow
import ActionCollection from "beinformed/models/actions/ActionCollection";
import DetailModel from "beinformed/models/detail/DetailModel";
import LinkCollection from "beinformed/models/links/LinkCollection";
import PanelCollection from "beinformed/models/panels/PanelCollection";
import ContentConfiguration from "beinformed/models/contentconfiguration/ContentConfiguration";

import AttributeFactory from "beinformed/models/attributes/AttributeFactory";

import type ModularUIResponse from "beinformed/utils/modularui/ModularUIResponse";
import type ListItemModel from "beinformed/models/list/ListItemModel";

/**
 * Detail of a list item
 */
export default class ListDetailModel extends DetailModel {
  _panelCollection: PanelCollection;
  _listitem: ListItemModel;
  _contentConfiguration: ContentConfiguration;

  _givenAnswers: ?CompositeAttributeModel;
  _results: ?CompositeAttributeModel;

  /**
   * Construct
   */
  constructor(modularUIResponse: ModularUIResponse) {
    super(modularUIResponse);

    this._panelCollection = new PanelCollection();
    this._actionCollection = new ActionCollection();

    this._contentConfiguration = new ContentConfiguration(
      this.contributions ? this.contributions.content : {}
    );

    this.setResultSection();
  }

  /**
   * @overwrite
   */
  get type(): string {
    return "ListDetail";
  }

  /**
   * @overwrite
   */
  static isApplicableModel(data: Object): boolean {
    return (
      data.contributions.resourcetype &&
      (data.contributions.resourcetype.endsWith("ListPanelDetail") ||
        [
          "DatastoreRelatedDatastorePanelDetail",
          "CaseRelatedDataStorePanelDetail"
        ].includes(data.contributions.resourcetype))
    );
  }

  // /**
  //  * Add links to expand on initialization of this model
  //  */
  // getInitialChildModelLinks(): LinkModel[] {
  //   const listitemPanels = this.listitem
  //     ? this.listitem.links.getLinksByGroup("panel").all
  //     : [];
  //
  //   const links = [...super.getInitialChildModelLinks(), ...listitemPanels];
  //
  //   if (this.hasResults) {
  //     links.push(...this.results.getInitialChildModelLinks());
  //     links.push(...this.givenAnswers.getInitialChildModelLinks());
  //   }
  //
  //   return links;
  // }

  /**
   * @override
   */
  setChildModels(models: ResolvableModels[]) {
    super.setChildModels(models);

    const listModels = models.filter(model => model.type === "List");
    if (listModels.length > 0) {
      this.panelCollection = new PanelCollection(listModels);
    }

    if (this.hasResults) {
      this.results.setChildModels(models);
      this.givenAnswers.setChildModels(models);
    }
  }

  /**
   * Set listitem of this listdetail and transfer listitem actions to listdetail actions
   */
  set listitem(listitem: ListItemModel) {
    this._listitem = listitem;

    // transfer listitem actions to _actions
    this._actionCollection = listitem.actionCollection;
  }

  /**
   * Get listitem
   */
  get listitem(): ListItemModel {
    return this._listitem;
  }

  /**
   * Getting the panel collection
   */
  get panelCollection(): PanelCollection {
    return this._panelCollection;
  }

  /**
   * Setting the panel collection
   */
  set panelCollection(panels: PanelCollection) {
    this._panelCollection = panels;
  }

  /**
   * Getting panel links
   */
  get panelLinks(): LinkCollection {
    return this.listitem.links.getLinksByGroup("panel");
  }

  /**
   * Getting the contentConfiguration
   */
  get contentConfiguration(): ContentConfiguration {
    return this._contentConfiguration;
  }

  set contentConfiguration(configuration: ContentConfiguration) {
    this._contentConfiguration = configuration;
  }

  get hasResults(): boolean {
    return typeof this.contributions.resultSection !== "undefined";
  }

  setResultSection() {
    if (this.contributions.resultSection) {
      if (
        this.contributions.resultSection.results &&
        this.contributions.resultSection.results !== null
      ) {
        this._results = AttributeFactory.createAttribute(
          null,
          "results",
          {
            dynamicschema: this.data.dynamicschema,
            ...this.data.resultSection
          },
          this.contributions.resultSection.results
        );
        this._results.isResult = true;
      }

      if (
        this.contributions.resultSection.givenAnswers &&
        this.contributions.resultSection.givenAnswers !== null
      ) {
        this._givenAnswers = AttributeFactory.createAttribute(
          null,
          "givenAnswers",
          {
            dynamicschema: this.data.dynamicschema,
            ...this.data.resultSection
          },
          this.contributions.resultSection.givenAnswers
        );
        this._givenAnswers.isResult = true;
      }
    }
  }

  get givenAnswers(): CompositeAttributeModel {
    return this._givenAnswers;
  }

  get results(): CompositeAttributeModel {
    return this._results;
  }
}

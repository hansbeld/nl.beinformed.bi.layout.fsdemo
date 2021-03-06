// @flow
import ActionCollection from "beinformed/models/actions/ActionCollection";
import DetailModel from "beinformed/models/detail/DetailModel";
import LinkCollection from "beinformed/models/links/LinkCollection";
import PanelCollection from "beinformed/models/panels/PanelCollection";
import ContentConfiguration from "beinformed/models/contentconfiguration/ContentConfiguration";
import AttributeSetModel from "beinformed/models/attributes/AttributeSetModel";

import AttributeFactory from "beinformed/models/attributes/AttributeFactory";

import type ModularUIResponse from "beinformed/modularui/ModularUIResponse";
import type ListItemModel from "beinformed/models/list/ListItemModel";
import type LinkModel from "beinformed/models/links/LinkModel";

/**
 * Detail of a list item
 */
export default class ListDetailModel extends DetailModel<
  ListDetailJSON,
  ListDetailContributionsJSON
> {
  _panelCollection: PanelCollection;
  _listitem: ListItemModel;
  _contentConfiguration: ContentConfiguration;

  _givenAnswers: ?CompositeAttributeModel;
  _results: ?CompositeAttributeModel;

  _eventdata: Array<AttributeSetModel>;

  /**
   * Construct
   */
  constructor(
    modularUIResponse: ModularUIResponse<
      ListDetailJSON,
      ListDetailContributionsJSON
    >
  ) {
    super(modularUIResponse);

    this._panelCollection = new PanelCollection();
    this._actionCollection = new ActionCollection();

    this._contentConfiguration = new ContentConfiguration(
      this.contributions ? this.contributions.content : {}
    );

    this.setResultSection();
    this.setEventData();
  }

  /**
   * Add links to expand on initialization of this model
   */
  getInitialChildModelLinks(): Array<LinkModel> {
    const listitemPanels = this.listitem
      ? this.listitem.links.getLinksByGroup("panel").all
      : [];

    const links = [...super.getInitialChildModelLinks(), ...listitemPanels];

    if (this.hasResults) {
      if (this.results) {
        links.push(...this.results.getInitialChildModelLinks());
      }
      if (this.givenAnswers) {
        links.push(...this.givenAnswers.getInitialChildModelLinks());
      }
    }

    return links;
  }

  /**
   * @override
   */
  setChildModels(models: Array<ResolvableModels>) {
    this._attributeCollection.setChildModels(models);

    if (this.results) {
      this.results.setChildModels(models);
    }

    if (this.givenAnswers) {
      this.givenAnswers.setChildModels(models);
    }
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
        data.contributions.resourcetype.endsWith("ListDetail") ||
        [
          "DatastoreRelatedDatastorePanelDetail",
          "CaseRelatedDataStorePanelDetail"
        ].includes(data.contributions.resourcetype))
    );
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
    if (this.contributions.resultSection && this.data.resultSection) {
      if (
        this.data.resultSection.results &&
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
        this.data.resultSection.givenAnswers &&
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

  get hasEventData(): boolean {
    return typeof this.contributions.eventdata !== "undefined";
  }

  addAttributes(
    key: string,
    eventData: AttributeSetAttributeData,
    eventContributions: AttributeSetContributions
  ) {
    this._eventdata.push(
      new AttributeSetModel(key, eventData, eventContributions)
    );
  }

  setEventData() {
    if (this.contributions.eventdata && this.data.eventdata) {
      this._eventdata = [];

      this.contributions.eventdata.forEach(eventDataContribution => {
        const key = Object.keys(eventDataContribution)[0];
        if (key in this.data.eventdata) {
          if (Array.isArray(this.data.eventdata[key])) {
            this.data.eventdata[key].forEach((eventDataData, i) => {
              this.addAttributes(
                `${key}-${i + 1}`,
                eventDataData,
                eventDataContribution[key]
              );
            });
          } else {
            this.addAttributes(
              key,
              this.data.eventdata[key],
              eventDataContribution[key]
            );
          }
        }
      });
    }
  }

  get eventdata(): Array<AttributeSetModel> {
    return this._eventdata;
  }
}

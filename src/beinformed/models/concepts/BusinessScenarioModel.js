// @flow
import ConceptDetailModel from "beinformed/models/concepts/ConceptDetailModel";
import type LinkModel from "beinformed/models/links/LinkModel";
import type ConceptLinkModel from "beinformed/models/concepts/ConceptLinkModel";

class BusinessScenarioModel extends ConceptDetailModel {
  _scenarioSteps: Array<ConceptDetailModel>;

  /**
   * @overwrite
   */
  get type(): string {
    return "BusinessScenario";
  }

  static isApplicableModel(data: Object): boolean {
    return (
      data.data._links &&
      data.data._links.concepttype &&
      data.data._links.concepttype.href ===
        "/concepttypes/Library/KMTs/Business scenarios.bixml/BusinessScenario"
    );
  }

  /**
   * @override
   */
  getInitialChildModelLinks(): LinkModel[] {
    const childModelLinks = [];
    const conceptTypeLink = this.links.getLinkByKey("concepttype");

    if (conceptTypeLink) {
      childModelLinks.push(conceptTypeLink);
    }

    const scenarioStepLinks = this.relationsCollection.all
      .filter(
        relation =>
          relation.direction === "outgoing" &&
          relation.concept.concepttypeHref.path ===
            "/concepttypes/Library/KMTs/Business scenarios.bixml/ScenarioStep"
      )
      .map(relation => relation.concept.asLinkModel());

    if (scenarioStepLinks.length > 0) {
      childModelLinks.push(...scenarioStepLinks);
    }

    return childModelLinks;
  }

  /**
   * @override
   */
  setChildModels() {
    const conceptTypeModel = this.childModels.find(
      model => model.type === "ConceptTypeDetail"
    );

    if (conceptTypeModel) {
      this._conceptType = conceptTypeModel;
    }

    this.scenarioSteps = this.childModels.filter(
      childModel =>
        childModel.type === "ConceptDetail" &&
        childModel.conceptType.selfhref.path ===
          "/concepttypes/Library/KMTs/Business scenarios.bixml/ScenarioStep"
    );
  }

  set scenarioSteps(models: Array<ConceptDetailModel>) {
    this._scenarioSteps = models;
  }

  get scenarioSteps(): Array<ConceptDetailModel> {
    return this._scenarioSteps;
  }

  get actors(): Array<ConceptLinkModel> {
    const actors = [];

    this.scenarioSteps.forEach(scenarioStep => {
      const relationsToActor = scenarioStep.relationsCollection.all.find(
        relation =>
          relation.direction === "outgoing" &&
          relation.concept.concepttypeHref.path ===
            "/concepttypes/Library/KMTs/Business scenarios.bixml/Persona"
      );

      const newRelationToActor =
        relationsToActor &&
        typeof actors.find(
          actor => actor.key === relationsToActor.concept.key
        ) === "undefined";

      if (relationsToActor && newRelationToActor) {
        actors.push(relationsToActor.concept);
      }
    });

    return actors;
  }
}

export default BusinessScenarioModel;

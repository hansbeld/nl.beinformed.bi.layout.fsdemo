// @flow
import ConceptLinkModel from "beinformed/models/concepts/ConceptLinkModel";

/**
 * Concept relation model
 */
export default class ConceptRelationModel {
  _relation: {
    relationType: string,
    relationLabel: string,
    relationDirection: string,
    textFragments: Object[]
  };

  _concept: ConceptLinkModel;

  /**
   * @override
   */
  constructor(relation: RelationJSON, entryDate: string | null = null) {
    this._relation = relation;

    this._concept = new ConceptLinkModel(relation.concept, entryDate);
  }

  /**
   * Get key of relation
   */
  get key(): string {
    return this._relation.relationType;
  }

  /**
   * Get Text fragments
   */
  get textfragments(): Object[] {
    return this._relation.textFragments;
  }

  /**
   * Get Label of relation
   */
  get label(): string {
    return this._relation.relationLabel;
  }

  /**
   * Get direction of relation
   */
  get direction(): string {
    return this._relation.relationDirection;
  }

  /**
   * Get other concept
   */
  get concept(): ConceptLinkModel {
    return this._concept;
  }

  /**
   * Set concept information
   */
  set concept(concept: ConceptLinkModel) {
    this._concept = concept;
  }
}

// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";
import ConceptRelationModel from "beinformed/models/concepts/ConceptRelationModel";

/**
 * concept relation collection
 */
export default class ConceptRelationCollection extends BaseCollection<
  ConceptRelationModel
> {
  /**
   * @override
   */
  constructor(
    relations: Array<RelationJSON> = [],
    entryDate: string | null = null
  ) {
    super();

    this.collection = Array.isArray(relations)
      ? relations.map(relation => new ConceptRelationModel(relation, entryDate))
      : [new ConceptRelationModel(relations, entryDate)];
  }

  /**
   * Get unique list of relation types
   */
  get types(): ConceptRelationModel[] {
    return this.collection.filter(
      (relation, pos, arr) =>
        arr.findIndex(item => item.key === relation.key) === pos
    );
  }

  /**
   * Get relation by its type
   */
  byType(type: string) {
    return this.collection.filter(relation => relation.key === type);
  }

  get incoming(): Array<ConceptRelationModel> {
    return this.all.filter(relation => relation.direction === "incoming");
  }

  get outgoing(): Array<ConceptRelationModel> {
    return this.all.filter(relation => relation.direction === "outgoing");
  }
}

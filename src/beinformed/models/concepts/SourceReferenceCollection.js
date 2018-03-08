// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";
import SourceReferenceModel from "beinformed/models/concepts/SourceReferenceModel";

/**
 * Source reference collection
 */
export default class SourceReferenceCollection extends BaseCollection<Object> {
  /**
   * @override
   */
  constructor(
    sourceReferences: Array<SourceReferenceJSON> = [],
    sourceReferenceTypes: Array<sectionReferenceType> = [],
    entryDate: string | null = null
  ) {
    super();

    this.collection = sourceReferences
      ? sourceReferences.map(sourceReference => {
          const sourceRefType = sourceReferenceTypes
            ? sourceReferenceTypes.find(
                type => type._id === sourceReference.type
              )
            : {};

          return new SourceReferenceModel(
            sourceReference,
            sourceRefType,
            entryDate
          );
        })
      : [];
  }

  byTypes(types: Array<string>) {
    return this.filter(sourceRef => types.includes(sourceRef.type));
  }
}

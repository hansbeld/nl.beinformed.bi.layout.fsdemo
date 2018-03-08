// @flow
import ContentLinkModel from "beinformed/models/content/ContentLinkModel";

class SourceReferenceItemModel {
  _sourceReference: SourceReferenceJSON;
  _sourceReferenceType: sectionReferenceType;
  _entryDate: string | null;

  constructor(
    sourceReference: SourceReferenceJSON,
    sourceReferenceType: sectionReferenceType,
    entryDate: string | null = null
  ) {
    this._sourceReference = sourceReference;
    this._sourceReferenceType = sourceReferenceType;
    this._entryDate = entryDate;
  }

  get link(): ContentLinkModel {
    const section = this._sourceReference._links.self.href.replace(
      `${this._sourceReference._links.content.href}/`,
      ""
    );

    return new ContentLinkModel(
      {
        ...this._sourceReference,
        section
      },
      this._entryDate
    );
  }

  get type(): string {
    return this._sourceReference.type;
  }
}

export default SourceReferenceItemModel;

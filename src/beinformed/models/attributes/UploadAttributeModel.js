// @flow
import filesize from "file-size";

import ConstraintCollection from "beinformed/models/constraints/ConstraintCollection";
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";

type UploadConstraintsType = {
  fileTypes: {
    extensions: string[],
    mimeTypes: string[]
  }[],
  fileSize: number
};

/**
 * Upload attribute
 */
export default class UploadAttributeModel extends StringAttributeModel {
  /**
   * @overwrite
   */
  get type(): string {
    return "upload";
  }

  /**
   * Retrieve single or multi upload
   */
  get multiple(): boolean {
    return this.contributions.multiple || false;
  }

  /**
   * Upload constraints
   */
  get uploadConstraints(): UploadConstraintsType {
    const mimeTypes = this.contributions.allowedMimeTypes
      ? this.contributions.allowedMimeTypes.filter(
          mimeType => mimeType !== "[...]"
        )
      : [];
    const extensions = this.contributions.allowedExtensions
      ? this.contributions.allowedExtensions.filter(
          extension => extension !== "[...]"
        )
      : [];

    return {
      fileTypes: extensions.map(extension => ({
        extensions: [extension],
        mimeTypes
      })),
      fileSize: this.contributions.uploadMaxFileSize
    };
  }

  /**
   * Add upload constraints
   */
  addConstraints() {
    const constraints = new ConstraintCollection();

    if (this.uploadConstraints.fileTypes.length > 0) {
      const allowedExtensionsString = this.uploadConstraints.fileTypes
        .map(fileType => fileType.extensions.join(", "))
        .join(", ");

      constraints.addConstraint("Constraint.File.InvalidExtension", null, {
        extensions: allowedExtensionsString
      });
    }

    if (this.uploadConstraints.fileSize) {
      constraints.addConstraint("Constraint.File.maxFilesize", null, {
        "max-filesize": filesize(this.uploadConstraints.fileSize).human("si")
      });
    }

    return constraints;
  }
}

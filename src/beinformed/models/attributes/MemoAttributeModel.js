// @flow
import StringAttributeModel from "beinformed/models/attributes/StringAttributeModel";

/**
 * Memo attribute
 */
export default class MemoAttributeModel extends StringAttributeModel {
  /**
   * @overwrite
   */
  get type(): string {
    return "memo";
  }

  /**
   * Retrieve number of rows to render in a textarea
   */
  get rows(): number {
    const DEFAULT_ROWS_TO_RENDER = 10;

    return this.contributions.rows || DEFAULT_ROWS_TO_RENDER;
  }

  /**
   * Get formatted switch
   */
  get formatted(): boolean {
    return this.contributions.formatted || false;
  }
}

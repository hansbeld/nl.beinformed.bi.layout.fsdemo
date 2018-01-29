// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";

/**
 * Collection of layouthint
 */
export default class LayoutHintCollection extends BaseCollection<string> {
  /**
   * Constructs the layouthint collection
   */
  constructor(layouthint: string[] = []) {
    super();

    if (!Array.isArray(layouthint)) {
      throw new TypeError(`${layouthint} is not an Array`);
    }

    this.collection = layouthint;
  }

  /**
   * Retrieve layout hints
   * @return {String[]}
   */
  get layouthint(): string[] {
    return this.collection;
  }

  /**
   * Checks if a specific layouthint exists
   */
  has(...hints: string[]) {
    const hintArray = hints.length > 0 ? Array.from(hints) : [];

    return (
      typeof hintArray.find(
        hint =>
          this.layouthint.includes(hint) ||
          typeof this.layouthint.find(hint2 => hint2.indexOf(hint) === 0) !==
            "undefined"
      ) !== "undefined"
    );
  }

  /**
   * Retrieve the first layouthint starting with hint
   */
  getByLayoutHint(hint: string): string | null {
    return this.layouthint.find(hint2 => hint2.indexOf(hint) === 0) || null;
  }
}

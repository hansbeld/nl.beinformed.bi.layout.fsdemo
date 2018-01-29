// @flow
import BaseCollection from "beinformed/models/base/BaseCollection";
import ActionModel from "beinformed/models/actions/ActionModel";

/**
 * Collection of actions
 * @see {action}
 */
export default class ActionCollection extends BaseCollection<ActionModel> {
  /**
   * Constructs the action collection
   */
  constructor(
    actions?: Array<ActionJSON>,
    actionsContributions?: Array<ActionContributionsJSON>
  ) {
    super();

    // no actions gives an empty collection
    if (!actions) {
      this.collection = [];

      // When actions are available but no contributions, then an error occured
    } else if (!actionsContributions || !Array.isArray(actionsContributions)) {
      throw new Error(
        "Data for ActionCollection found, but no contributions available"
      );
    } else {
      this.collection = actions.map(action => {
        if (actionsContributions) {
          const contributions = actionsContributions.find(
            actionContribution => actionContribution.name === action.name
          );

          if (contributions) {
            return new ActionModel(action, contributions);
          }
        }

        throw new Error(`Contributions not found for action ${action.name}`);
      });
    }
  }

  /**
   * Retrieve actions by type
   */
  getActionsByType(type: string) {
    const newCollection = new ActionCollection();

    newCollection.collection = this.all.filter(action => action.type === type);

    return newCollection;
  }

  /**
   * Retrieve actions including a layout hint
   */
  getActionsByLayoutHint(hint: string) {
    const newCollection = new ActionCollection();

    newCollection.collection = this.all.filter(action =>
      action.layouthint.has(hint)
    );

    return newCollection;
  }

  /**
   * Indicates if an action with layout hint exists
   */
  hasActionsByLayoutHint(hint: string) {
    return this.getActionsByLayoutHint(hint).length > 0;
  }

  /**
   * Use as path regex for react router routes
   */
  get routePath(): string {
    if (this.length === 0) {
      return "__NON_EXISTING_ROUTE__";
    }

    const path = this.collection.map(action => action.selfhref.path).join("|");
    return this.length > 1 ? `(${path})` : path;
  }
}

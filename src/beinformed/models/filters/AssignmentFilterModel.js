// @flow
import BaseFilterModel from "beinformed/models/filters/BaseFilterModel";
import AttributeFactory from "beinformed/models/attributes/AttributeFactory";

/**
 * Assignment filter consists of two filters: assignment type and user filter
 */
export default class AssignmentFilterModel extends BaseFilterModel<
  AssignmentsFilterParamJSON,
  AssignmentsFilterContributionsJSON
> {
  _assignmenttype: AttributeType;
  _user: AttributeType;

  /**
   * Construct an assignment filter
   */
  constructor(
    data: AssignmentsFilterParamJSON,
    contributions: AssignmentsFilterContributionsJSON
  ) {
    super(data, contributions);

    this._assignmenttype = this.createAssignmentTypeModel();
    this._user = this.createUserModel();
  }

  /**
   * Getting key of the list these filters apply to
   */
  get listkey(): string {
    return this._listKey;
  }

  /**
   * Set key of list this filter belongs to
   */
  set listkey(key: string) {
    this._listKey = key;

    if (this._assignmenttype) {
      this._assignmenttype.listkey = key;
    }

    if (this._user) {
      this._user.listkey = this.listkey;
    }
  }

  /**
   * Creates an assignmenttype model when assignmenttype json is present
   */
  createAssignmentTypeModel() {
    const assignmentTypeData = this.data.ASSIGNMENTTYPE;

    if (this.data.dynamicschema && this.data.dynamicschema.ASSIGNMENTTYPE) {
      assignmentTypeData.dynamicschema = {
        ASSIGNMENTTYPE: this.data.dynamicschema.ASSIGNMENTTYPE
      };
    }

    const assignmentTypeContributions: ChoiceAttributeContributionsJSON = {
      ...this.contributions.ASSIGNMENTTYPE,
      type: "choice",
      enumerated: true,
      optionMode: assignmentTypeData._links ? "lookup" : "static"
    };

    return AttributeFactory.createAttribute(
      null,
      assignmentTypeData.name || assignmentTypeData.param,
      assignmentTypeData,
      assignmentTypeContributions
    );
  }

  /**
   * Creates an assignmenttype model when userkey json is present
   */
  createUserModel() {
    const userData = this.data.USERKEY;

    if (this.data.dynamicschema && this.data.dynamicschema.USERKEY) {
      userData.dynamicschema = {
        USERKEY: this.data.dynamicschema.USERKEY
      };
    }

    const userContributions = {
      ...this.contributions.USERKEY,
      type: "choice",
      optionMode: userData._links ? "lookup" : "static"
    };

    return AttributeFactory.createAttribute(
      null,
      userData.name || userData.param,
      userData,
      userContributions
    );
  }

  /**
   * The assignment filter consists of two part. This method return the assignment type attribute
   */
  get assignmenttype(): AttributeType {
    return this._assignmenttype;
  }

  /**
   * The assignment filter consists of two part. This method return the user identifier attribute
   */
  get user(): AttributeType {
    return this._user;
  }

  /**
   * Getting the parameters of this filter
   */
  get params(): {
    name: string,
    value: string | null
  }[] {
    if (this.assignmenttype && this.user) {
      return [
        {
          name: this.assignmenttype.name,
          value: this.assignmenttype.value
        },
        {
          name: this.user.name,
          value: this.user.value
        }
      ];
    }

    return [];
  }

  /**
   * Reset the values within the filter
   */
  reset() {
    this.assignmenttype.reset();
    this.user.reset();

    return this;
  }

  /**
   * Update this filter
   */
  update(attribute: AttributeType, value: string) {
    if (this.user.key === attribute.key) {
      this.user.update(value);
    } else if (this.assignmenttype.key === attribute.key) {
      this.assignmenttype.update(value);
    }
  }
}

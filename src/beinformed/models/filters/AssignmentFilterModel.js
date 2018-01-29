// @flow
import FilterModel from "beinformed/models/filters/FilterModel";
import AttributeFactory from "beinformed/models/attributes/AttributeFactory";

/**
 * Assignment filter consists of two filters: assignment type and user filter
 */
export default class AssignmentFilterModel extends FilterModel {
  _assignmenttype: FilterModel;
  _user: FilterModel;

  /**
   * Construct an assignment filter
   */
  constructor(data: FilterJSON, contributions: FilterContributionsJSON) {
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
    const assignmentTypeKey = Object.keys(this.data).find(key =>
      key.includes("ASSIGNMENTTYPE")
    );

    if (assignmentTypeKey) {
      const assignmentTypeData = this.data[assignmentTypeKey];

      if (
        this.data.dynamicschema &&
        this.data.dynamicschema[assignmentTypeKey]
      ) {
        assignmentTypeData.dynamicschema = this.data.dynamicschema[
          assignmentTypeKey
        ];
      }

      const assignmentTypeContributions = {
        ...this.contributions[assignmentTypeKey],
        optionMode: assignmentTypeData._links ? "lookup" : "static"
      };

      return AttributeFactory.createAttribute(
        null,
        assignmentTypeData.name || assignmentTypeData.param,
        assignmentTypeData,
        assignmentTypeContributions
      );
    }

    throw new Error(
      "No data or contributions found for the assignment type model"
    );
  }

  /**
   * Creates an assignmenttype model when userkey json is present
   */
  createUserModel() {
    const userkeyKey = Object.keys(this.data).find(key =>
      key.includes("USERKEY")
    );

    if (userkeyKey) {
      const userData = this.data[userkeyKey];

      if (this.data.dynamicschema && this.data.dynamicschema[userkeyKey]) {
        userData.dynamicschema = this.data.dynamicschema[userkeyKey];
      }

      const userContributions = {
        ...this.contributions[userkeyKey],
        optionMode: userData._links ? "lookup" : "static"
      };

      return AttributeFactory.createAttribute(
        null,
        userData.name || userData.param,
        userData,
        userContributions
      );
    }

    throw new Error("No data or contributions found for the user model");
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

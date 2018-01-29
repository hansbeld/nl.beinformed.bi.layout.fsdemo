// @flow
import React, { Component } from "react";

import FormErrorList from "beinformed/components/FormError/FormErrorList";
import type FormModel from "beinformed/models/form/FormModel";
import type FormObjectModel from "beinformed/models/form/FormObjectModel";

type FormErrorTreeProps = {
  form: FormModel,
  onAttributeClick?: Function,
  onObjectClick?: (object: FormObjectModel) => void
};

class FormErrorTree extends Component<FormErrorTreeProps> {
  renderObjectErrors() {
    return this.props.form.missingObjects.all
      .filter(object => object.errorCollection.hasItems)
      .map(object => (
        <li key={object.key}>
          <a
            href={`#${this.props.form.key}-${object.key}`}
            className="alert-link"
            onClick={e => {
              e.preventDefault();

              if (this.props.onObjectClick) {
                return this.props.onObjectClick(object);
              }

              return false;
            }}
          >
            {object.label}
          </a>
          <FormErrorList errorCollection={object.errorCollection} />
        </li>
      ));
  }

  renderAttributeErrors() {
    return this.props.form.missingObjects.all.map(object => {
      const attributes = object.attributeCollection.all.filter(
        attr => attr.errorCollection.hasItems
      );

      return attributes.map(attribute => (
        <li key={attribute.name}>
          <a
            href={`#${this.props.form.key}-${attribute.name}`}
            className="alert-link"
            onClick={e => {
              e.preventDefault();

              if (this.props.onAttributeClick) {
                return this.props.onAttributeClick(attribute);
              }

              return false;
            }}
          >
            {attribute.label}
          </a>

          <FormErrorList errorCollection={attribute.errorCollection} />
        </li>
      ));
    });
  }

  render() {
    return (
      <ul className="form-errortree list-unstyled">
        {this.props.form.errorCollection.hasItems && (
          <li>
            <FormErrorList errorCollection={this.props.form.errorCollection} />
          </li>
        )}

        {this.props.form.missingObjects.errorCollection.hasItems && (
          <li>
            <FormErrorList
              errorCollection={this.props.form.missingObjects.errorCollection}
            />
          </li>
        )}

        {this.renderObjectErrors()}

        {this.renderAttributeErrors()}
      </ul>
    );
  }
}

export default FormErrorTree;

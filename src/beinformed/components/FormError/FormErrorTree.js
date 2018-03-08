// @flow
import React, { Component } from "react";

import FormErrorList from "beinformed/components/FormError/FormErrorList";

import "./FormErrorTree.scss";

import type { FormModel, FormObjectModel } from "beinformed/models";

type FormErrorTreeProps = {
  form: FormModel,
  onAttributeClick?: Function,
  onObjectClick?: (object: FormObjectModel) => void
};

const ERROR_HIGHLIGHT_TIMEOUT = 1000;

class FormErrorTree extends Component<FormErrorTreeProps> {
  handleClick = (
    e: SyntheticEvent<HTMLAnchorElement>,
    objectName: string,
    attributeName?: string
  ) => {
    e.preventDefault();

    const scrollToSelector = attributeName
      ? `[data-name="${objectName}"] [data-name="${attributeName}"]`
      : `[data-name="${objectName}"]`;

    const scrollTo = document.querySelectorAll(scrollToSelector);
    if (scrollTo.length > 0) {
      scrollTo[0].scrollIntoView(false);
      scrollTo[0].classList.add("error-highlight");

      setTimeout(() => {
        scrollTo[0].classList.remove("error-highlight");
      }, ERROR_HIGHLIGHT_TIMEOUT);
    }
  };

  renderObjectErrors() {
    return this.props.form.missingObjects.all
      .filter(object => object.errorCollection.hasItems)
      .map(object => (
        <li key={object.key}>
          <a
            href={`#${this.props.form.key}-${object.key}`}
            className="alert-link"
            onClick={e => this.handleClick(e, object.key)}
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
            onClick={e => this.handleClick(e, object.key, attribute.name)}
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

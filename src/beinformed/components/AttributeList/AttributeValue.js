// @flow
import React, { Component } from "react";
import classNames from "classnames";

import Icon from "beinformed/components/Icon/Icon";
import Link from "beinformed/components/Link/Link";

type AttributeValueProps = {
  className?: string,
  attribute: AttributeType
};

import "./AttributeValue.scss";

/**
 * Render readonly attribute values
 */
class AttributeValue extends Component<AttributeValueProps> {
  shouldComponentUpdate(nextProps: AttributeValueProps) {
    return (
      nextProps.attribute !== this.props.attribute ||
      (nextProps.attribute !== null &&
        (nextProps.attribute.readonlyvalue !==
          this.props.attribute.readonlyvalue ||
          nextProps.attribute.isChangedSince(
            this.props.attribute.lastModification
          )))
    );
  }

  getEmptyValue() {
    return "\u00A0";
  }

  getDownloadLink(attribute: AttributeType) {
    return (
      <Link href={attribute.downloadLink.href} isDownload>
        <Icon name="download" textAfter />
        {attribute.readonlyvalue}
      </Link>
    );
  }

  getPasswordAttribute() {
    return "********";
  }

  getRangeAttribute(attribute: AttributeType) {
    return `${attribute.start.readonlyvalue} - ${attribute.end.readonlyvalue}`;
  }

  getMoneyAttribute(attribute: AttributeType) {
    return [
      <span key="currency-symbol" className="currency-symbol">
        {attribute.currencySymbol}
      </span>,
      <span key="money-value" className="money-value">
        {attribute.readonlyvalue}
      </span>
    ];
  }

  getCompositeAttribute(attribute: AttributeType) {
    return attribute.children.all.map((childAttribute, i) => (
      <div key={i} className="composite-attribute-child">
        <div className="composite-attribute-child-label text-small">
          {childAttribute.label}
        </div>

        {this.renderValue(childAttribute)}
      </div>
    ));
  }

  renderPrefix(attribute: AttributeType) {
    if (attribute.prefix) {
      return (
        <span key="attr-prefix" className="prefix">
          {attribute.prefix}
        </span>
      );
    }

    return null;
  }

  renderPostfix(attribute: AttributeType) {
    if (attribute.postfix) {
      return (
        <span key="attr-postfix" className="postfix">
          {attribute.postfix}
        </span>
      );
    }

    return null;
  }

  getReadonlyValue(attribute: AttributeType) {
    return [
      this.renderPrefix(attribute),
      <span key="attr-value" className="value">
        {attribute.readonlyvalue}
      </span>,
      this.renderPostfix(attribute)
    ];
  }

  // eslint-disable-next-line max-statements
  getAttributeValue(attribute: AttributeType) {
    if (!attribute || !attribute.readonlyvalue) {
      return this.getEmptyValue();
    }

    if (attribute.readonlyvalue && attribute.downloadLink) {
      return this.getDownloadLink(attribute);
    }

    if (attribute.type === "password") {
      return this.getPasswordAttribute();
    }

    if (attribute.type === "range") {
      return this.getRangeAttribute(attribute);
    }

    if (attribute.type === "composite") {
      return this.getCompositeAttribute(attribute);
    }

    if (attribute.type === "money") {
      return this.getMoneyAttribute(attribute);
    }

    if (attribute.readonlyvalue) {
      return this.getReadonlyValue(attribute);
    }

    return "Unknown value";
  }

  /**
   * Separate method for rendering to be able to render recursevily for composite attributes
   */
  renderValue(attribute: AttributeType) {
    const attributeType = attribute ? attribute.type : "unknown";

    const cssclass = classNames(
      this.props.className,
      "attribute-value",
      `attribute-type-${attributeType}`,
      {
        "text-right":
          attribute && attribute !== null && attribute.alignment === "right",
        "text-center":
          attribute && attribute !== null && attribute.alignment === "center"
      }
    );

    return <div className={cssclass}>{this.getAttributeValue(attribute)}</div>;
  }

  render() {
    return this.renderValue(this.props.attribute);
  }
}

export default AttributeValue;

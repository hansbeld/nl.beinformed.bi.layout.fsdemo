// @flow
import React from "react";
import classNames from "classnames";

import createAttribute from "beinformed/components/FormAttribute/createAttribute";

const ChildAttributes = props => (
  <div className="children">
    {props.attribute.children.all.map(childAttribute => {
      const childClass = classNames({
        "has-danger": childAttribute.inError()
      });

      const name = (props.namePrefix || "") + childAttribute.name;

      return (
        <props.AttributeRenderer
          key={name}
          className={childClass}
          questionContentConfiguration={props.questionContentConfiguration}
          attribute={childAttribute}
          isFilter={props.isFilter}
          name={name}
          id={name}
          formLayout={props.formLayout}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
        />
      );
    })}
  </div>
);

export default createAttribute(ChildAttributes);

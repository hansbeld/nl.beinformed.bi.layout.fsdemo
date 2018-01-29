// @flow
import React from "react";

import CloseButton from "beinformed/components/Button/CloseButton";

/**
 * Renders modal header
 */
const ModalHeader = ({
  children,
  showClose,
  onClose
}: {
  children?: any,
  showClose?: boolean,
  onClose?: (e: SyntheticEvent<*>) => void
}) => (
  <div className="modal-header">
    {children}
    {showClose && onClose && <CloseButton onClose={onClose} />}
  </div>
);

export default ModalHeader;

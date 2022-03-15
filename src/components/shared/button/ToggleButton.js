import React, { memo } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import Button from "./Button";
import { isFunction } from "lodash";

const ToggleButton = ({
  isShow,
  onDisplay,
  className,
  isStyleIcon = false,
}) => {
  onDisplay = isFunction(onDisplay) ? onDisplay : () => {};

  return (
    <Button
      icon={isShow ? BiShow : BiHide}
      onClick={() => onDisplay()}
      className={className}
      isStyleIcon={isStyleIcon}
    />
  );
};

export default memo(ToggleButton);

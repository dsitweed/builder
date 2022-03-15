import { isFunction } from "lodash";
import React, { memo } from "react";
import BaseTooltip from "./BaseTooltip";

const FunctionIcon = ({
  title,
  placement = "left",
  onDivClick,
  className,
  param,
  children,
  style,
}) => {
  onDivClick = isFunction(onDivClick) ? onDivClick : () => {};

  return (
    <BaseTooltip title={title} placement={placement} arrow>
      <div
        className={className}
        style={style}
        onClick={() => onDivClick(param)}
      >
        {children}
      </div>
    </BaseTooltip>
  );
};

export default memo(FunctionIcon);

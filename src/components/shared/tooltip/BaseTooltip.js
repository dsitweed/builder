import { Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { memo } from "react";

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontSize: 12,
  },
}));

const BaseTooltip = ({ timeout = 500, children, ...props }) => {
  const classes = useStyles();

  return (
    <Tooltip
      TransitionProps={{ timeout: timeout }}
      classes={classes}
      {...props}
    >
      {children}
    </Tooltip>
  );
};

export default memo(BaseTooltip);

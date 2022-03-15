import React, { memo } from "react";
import { useAccuracyCompareSelector } from "../../../contexts/AccuracyContext";
import { safetyCheck } from "../../../utils";
import AccuracyPoint from "../../../components/shared/tooltip/AccuracyPoint";
import { SUMMARY } from "../../../constants/SectionConstants";
import { onScroll } from "../../hook";
import { Grid } from "@material-ui/core";

const BlockSummary1 = ({
  id,
  data,
  className,
  headingClass,
  heading: Heading,
}) => {
  const realData = data["struct"][id];
  const isDisplayAccuracy = data.options.accuracy
    ? data.options.accuracy
    : false;
  const accuracy = useAccuracyCompareSelector(`${id}.body`, realData.body);

  return (
    safetyCheck(data.struct.summary, "body") && (
      <Grid container onClick={() => onScroll(SUMMARY)} className={className}>
        <Grid item xs={10}>
          <Heading className={headingClass} children={realData.heading} />
          <p className="markdown" style={{ textAlign: "justify" }}>
            {realData.body}
          </p>
        </Grid>
        <Grid item xs={2}>
          <AccuracyPoint {...{ isDisplayAccuracy, accuracy }} />
        </Grid>
      </Grid>
    )
  );
};

export default memo(BlockSummary1);

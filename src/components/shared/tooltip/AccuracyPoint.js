import React, { memo, useEffect, useState } from "react";
import { ACCURACY, INACCURACY } from "../../../constants/CommonConstants";
import { AiFillCheckCircle } from "react-icons/ai";
import cx from "classnames";
import styles from "./tooltip.module.css";
import { hexToRgb } from "../../../utils";
import { useTranslation } from "react-i18next";
import BaseTooltip from "./BaseTooltip";
import {
  useResumeSelector,
  useSettingSelector,
} from "../../../contexts/ResumeContext";

const AccuracyPoint = ({
  placement = "top",
  className,
  isDisplayAccuracy = true,
  accuracy = ACCURACY,
  mode = "edit",
}) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const accuracyColor = useSettingSelector(
    "options.colors.accuracy",
    "#03A9F4"
  );
  const editAccuracyColor = useResumeSelector(
    "options.colors.accuracy",
    "#03A9F4"
  );
  const { t } = useTranslation();

  useEffect(() => {
    let config = { r: "", g: "", b: "" };
    if (mode === "edit") config = hexToRgb(editAccuracyColor);
    else config = hexToRgb(accuracyColor);
    if (accuracy === ACCURACY) {
      setColor(`rgba(${config.r - 100}, ${config.g - 100}, ${config.b - 100})`);
      setTitle(t("accuracy"));
    } else if (accuracy === INACCURACY) {
      setColor(`rgba(${config.r - 50}, ${config.g - 50}, ${config.b - 50})`);
      setTitle(t("inaccuracy"));
    } else {
      setColor(`rgba(${config.r}, ${config.g}, ${config.b})`);
      setTitle(t("other"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accuracyColor, editAccuracyColor]);

  return (
    <>
      {isDisplayAccuracy ? (
        <BaseTooltip
          className={cx(className, "text-right")}
          title={title}
          placement={placement}
          arrow
        >
          <div className={cx("text-right", styles.circle)}>
            <AiFillCheckCircle size="20px" color={color} />
          </div>
        </BaseTooltip>
      ) : null}
    </>
  );
};

export default memo(AccuracyPoint);

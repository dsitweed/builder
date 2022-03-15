import React, { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useResumeSelector, useResumeDispatch } from "../../../contexts/ResumeContext";
import { ResumeEvent } from "../../../constants/ContextEvent";
import cx from "classnames";

const Heading = ({ id, className }) => {
  const { t } = useTranslation();
  
  const dispatch = useResumeDispatch();
  const heading = useResumeSelector(`struct.${id}.heading`, t(`${id}`));

  useEffect(() => {
    if (heading === "") {
      const result = t(`${id}`);
      dispatch({
        type: ResumeEvent.ON_INPUT,
        payload: { path: `struct.${id}.heading`, value: result },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h2 className={cx("text-3xl focus:outline-none", className)}>{heading}</h2>
  );
};

export default memo(Heading);

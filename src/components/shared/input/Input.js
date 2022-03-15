import { isFunction } from "lodash";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { ResumeEvent } from "../../../constants/ContextEvent";
import { useResumeDispatch, useResumeSelector } from "../../../contexts/ResumeContext";

const Input = ({
  path,
  label,
  error,
  value,
  touched,
  onChange,
  className,
  isRequired,
  isBoldLabel,
  ...props
}) => {
  const { t } = useTranslation();
  const [uuid, setUuid] = useState(null);
  const stateValue = useResumeSelector(path, "");
  const dispatch = useResumeDispatch();

  useEffect(() => {
    setUuid(uuidv4());
  }, []);

  value = path ? stateValue : value;
  onChange = isFunction(onChange)
    ? onChange
    : (e) => {
        dispatch({
          type: ResumeEvent.ON_INPUT,
          payload: { path, value: e.target.value },
        });
      };

  return (
    <div className={className}>
      <label htmlFor={uuid}>
        <span>{isBoldLabel ? `${label}*` : label}</span>
        {
          <div className="relative grid items-center text-justify">
            <input id={uuid} value={value} onChange={onChange} {...props} />
          </div>
        }

        {error && touched && <p>{error}</p>}
        {isRequired && (
          <p
            className="opacity-75 font-normal lowercase"
            style={{ color: "red" }}
          >
            {t("required")}
          </p>
        )}
      </label>
    </div>
  );
};

export default memo(Input);

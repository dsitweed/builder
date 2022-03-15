import { isFunction } from "lodash";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { ResumeEvent } from "../../../constants/ContextEvent";
import { useResumeDispatch, useResumeSelector } from "../../../contexts/ResumeContext";

const TextareaInput = ({
  path,
  label,
  error,
  value,
  touched,
  onChange,
  className,
  isRequired,
  row = 4,
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
        <span>
          {label}{" "}
          {isRequired && (
            <span className="opacity-75 font-normal lowercase">
              ({t("required")})
            </span>
          )}
        </span>
        <div className="flex flex-col text-justify">
          <textarea
            id={uuid}
            rows={row}
            value={value}
            onChange={onChange}
            {...props}
          />
        </div>
        {error && touched && <p>{error}</p>}
      </label>
    </div>
  );
};

export default memo(TextareaInput);

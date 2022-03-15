import dayjs from "dayjs";
import { get, isArray, isEmpty } from "lodash";

export const getModalText = (isEditMode, type, t) =>
  isEditMode ? `${t("edit")} ${type}` : `${t("add")} ${type}`;

  //Ko hieu cach van hanh cua ham
export const safetyCheck = (section, path = "items") => {
  const check1 = !!(
    section &&
    section.visible === true &&
    !isEmpty(section[path])
  );
  if (isArray(section[path])) {
    const check2 = section[path].filter((x) => x.visible).length;
    return check1 && check2 > 0;
  }
  return check1;
};

export const handleKeyUp = (event, action) => {
  (event.which === 13 || event.which === 32) && action();
};

export const isFileImage = (file) => {
  const acceptedImageTypes = ["image/jpeg", "image/png"];
  return file && acceptedImageTypes.includes(file.type);
};

export const scaler = (value) => {
  const logMax = 2.5;
  const logMin = 0.6;
  const steps = 20;
  const logRange = logMax / logMin;
  const logStepSize = logRange ** (1 / steps);
  const min = 0;

  return logStepSize ** (value - min) * logMin;
};

export const formatDate = ({ date, language = "vi", includeDay = false }) => {
  const template = includeDay ? "DD MMMM YYYY" : "MMMM YYYY";

  return dayjs(date).locale(language.substr(0, 2)).format(template);
};

export const formatDateRange = (
  { startDate, endDate, language = "vi" },
  t,
  isEmptyEnd = false
) => {
  const start = `${dayjs(startDate)
    .locale(language.substr(0, 2))
    .format("MMMM YYYY")}`;

  const end = dayjs(endDate).isValid()
    ? `${dayjs(endDate).locale(language.substr(0, 2)).format("MMMM YYYY")}`
    : null;

  if (end == null) {
    if (isEmptyEnd === false) return `${start} - ${t("present")}`;
    else return `${start}`;
  }
  return `${start} - ${end}`;
};

export const getFieldProps = (formik, schema, name) => ({
  touched: get(formik, `touched.${name}`, false),
  error: get(formik, `errors.${name}`, ""),
  isRequired: get(schema, `fields.${name}._exclusive.required`),
  ...formik.getFieldProps(name),
});

export const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const getBuilderQuery = (location) => {
  const query = new URLSearchParams(location);
  return {
    userId: query.get("userId"),
    templateId: query.get("templateId"),
    auth: query.get("auth"),
    cvId: query.get("cvId"),
  };
};

export const updateURLParameter = (
  url,
  addParams,
  addParamVals,
  removeParams
) => {
  var newAdditionalURL = "";
  var tempArray = url.split("?");
  var baseURL = tempArray[0];
  var additionalURL = tempArray[1];
  if (additionalURL) {
    tempArray = additionalURL.split("&");
    for (var i = 0; i < tempArray.length; i++) {
      var arr = tempArray[i].split("=")[0];
      if (!addParams.includes(arr) && !removeParams.includes(arr))
        if (i === 0) newAdditionalURL += tempArray[i];
        else newAdditionalURL += "&" + tempArray[i];
    }
    for (var i1 = 0; i1 < addParams.length; i1++) {
      newAdditionalURL += "&" + addParams[i1] + "=" + addParamVals[i1];
    }
  }
  window.history.replaceState("", "", baseURL + "?" + newAdditionalURL);
};

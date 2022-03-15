import { Formik } from "formik";
import React, { memo } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import TextareaInput from "../../../../components/shared/input/TextareaInput";
import Input from "../../../../components/shared/input/Input";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";

const initialValues = {
  institution: "",
  field: "",
  degree: "",
  gpa: "",
  startDate: "",
  endDate: "",
  summary: "",
};

const EducationDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    institution: Yup.string().required(t("required")),
    field: Yup.string().required(t("required")),
    degree: Yup.string(),
    gpa: Yup.string(),
    startDate: Yup.date(),
    endDate: Yup.date().when(
      "startDate",
      (startDate, yupSchema) =>
        startDate && yupSchema.min(startDate, t("dateRangeValidation"))
    ),
    summary: Yup.string(),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataDialog
          name={t("education")}
          path="struct.education.items"
          {...{ open, setOpen, data, setData }}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("institution")}
              className="col-span-2"
              placeholder={t("institutionPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "institution")}
            />

            <Input
              label={t("field")}
              className="col-span-2"
              placeholder={t("fieldPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "field")}
            />

            <Input
              label={t("degree")}
              placeholder={t("degreePlaceholder")}
              {...getFieldProps(formik, schema, "degree")}
            />

            <Input
              label={t("gpa")}
              placeholder={t("gpaPlaceholder")}
              {...getFieldProps(formik, schema, "gpa")}
            />

            <Input
              type="date"
              label={t("startDate")}
              {...getFieldProps(formik, schema, "startDate")}
            />

            <Input
              type="date"
              label={t("endDate")}
              {...getFieldProps(formik, schema, "endDate")}
            />

            <TextareaInput
              label={t("summary")}
              className="col-span-2"
              {...getFieldProps(formik, schema, "summary")}
            />
          </div>
        </DataDialog>
      )}
    </Formik>
  );
};

export default memo(EducationDialog);

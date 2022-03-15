import { Formik } from "formik";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Input from "../../../../components/shared/input/Input";
import TextareaInput from "../../../../components/shared/input/TextareaInput";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";

const initialValues = {
  title: "",
  city: "",
  startDate: "",
  endDate: "",
  summary: "",
};

const CustomDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    title: Yup.string().required(t("required")),
    city: Yup.string().required(t("required")),
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
          name={t("custom")}
          path="struct.custom.items"
          {...{ open, setOpen, data, setData }}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("title")}
              className="col-span-1"
              placeholder={t("titlePlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "title")}
            />

            <Input
              label={t("city")}
              className="col-span-1"
              placeholder={t("cityPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "city")}
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

export default memo(CustomDialog);

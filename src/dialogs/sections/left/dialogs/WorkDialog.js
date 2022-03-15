import { Formik } from "formik";
import React, { memo } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Input from "../../../../components/shared/input/Input";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";
import TextareaInput from "../../../../components/shared/input/TextareaInput";

const initialValues = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  summary: "",
};

const WorkDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    company: Yup.string().required(t("required")),
    position: Yup.string().required(t("required")),
    startDate: Yup.date(),
    endDate: Yup.date().when(
      "startDate",
      (startDate, yupSchema) =>
        startDate && yupSchema.min(startDate, t("dateRangeValidation"))
    ),
    summary: Yup.string().min(10, t("minValidation", { number: 10 })),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataDialog
          path="struct.work.items"
          name={t("work")}
          {...{ open, setOpen, data, setData }}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("company")}
              className="col-span-2"
              placeholder={t("companyPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "company")}
            />

            <Input
              label={t("position")}
              className="col-span-2"
              placeholder={t("positionPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "position")}
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

export default memo(WorkDialog);

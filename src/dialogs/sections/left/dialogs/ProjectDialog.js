import { Formik } from "formik";
import React, { memo } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Input from "../../../../components/shared/input/Input";
import TextareaInput from "../../../../components/shared/input/TextareaInput";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";

const initialValues = {
  title: "",
  authors: "",
  duration: 0,
  issuedDate: "",
  summary: "",
};

const ProjectDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    title: Yup.string().required(t("required")),
    authors: Yup.string().required(t("required")),
    issuedDate: Yup.date().max(new Date()),
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
          name={t("project")}
          path="struct.projects.items"
          {...{ open, setOpen, data, setData }}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("title")}
              className="col-span-2"
              placeholder={t("enterTitle")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "title")}
            />

            <Input
              label={t("author")}
              placeholder={t("authorPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "authors")}
            />

            <Input
              type="date"
              label={t("issuedDate")}
              className={t("issuedDatePlaceholder")}
              {...getFieldProps(formik, schema, "issuedDate")}
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

export default memo(ProjectDialog);

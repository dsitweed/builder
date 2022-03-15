import { Formik } from "formik";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import TextareaInput from "../../../../components/shared/input/TextareaInput";
import Input from "../../../../components/shared/input/Input";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";

const initialValues = {
  title: "",
  authors: "",
  conference: "",
  issuedDate: "",
  url: "",
  summary: "",
};

const PublicationDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    title: Yup.string().required(t("required")),
    authors: Yup.string().required(t("required")),
    conference: Yup.string().required(t("required")),
    issuedDate: Yup.date(),
    url: Yup.string().url(t("urlValidation")),
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
          name={t("publications")}
          path="struct.publications.items"
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
              label={t("authors")}
              placeholder={t("authorPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "authors")}
            />

            <Input
              label={t("conference")}
              placeholder={t("conferencePlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "conference")}
            />

            <Input
              type="date"
              label={t("issuedDate")}
              {...getFieldProps(formik, schema, "issuedDate")}
            />

            <Input
              label={t("url")}
              placeholder={t("urlPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "url")}
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

export default memo(PublicationDialog);

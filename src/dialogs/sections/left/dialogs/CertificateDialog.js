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
  issuer: "",
  issueDate: "",
  endDate: "",
  credentialUrl: "",
  summary: "",
};

const CertificateDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    title: Yup.string().required(t("required")),
    issuer: Yup.string().required(t("required")),
    issueDate: Yup.date().max(new Date()),
    endDate: Yup.date(),
    credentialUrl: Yup.string().url(t("urlValidation")),
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
          name={t("certification")}
          path="struct.certifications.items"
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
              className="col-span-2"
              label={t("issuer")}
              placeholder={t("issuerPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "issuer")}
            />

            <Input
              className="col-span-2"
              type="text"
              label={t("url")}
              placeholder={t("urlPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "credentialUrl")}
            />

            <Input
              type="date"
              label={t("issuedDate")}
              {...getFieldProps(formik, schema, "issueDate")}
            />

            <Input
              type="date"
              label={t("expiryDate")}
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

export default memo(CertificateDialog);

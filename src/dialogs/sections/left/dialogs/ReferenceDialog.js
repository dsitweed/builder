import { Formik } from "formik";
import React, { memo } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Input from "../../../../components/shared/input/Input";
import TextareaInput from "../../../../components/shared/input/TextareaInput";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";

const initialValues = {
  name: "",
  position: "",
  phone: "",
  email: "",
  summary: "",
};

const ReferenceDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    name: Yup.string().required(t("required")),
    position: Yup.string().required(t("required")),
    phone: Yup.string(),
    email: Yup.string().email(t("emailValidation")),
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
          name={t("reference")}
          path="struct.references.items"
          {...{ open, setOpen, data, setData }}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("name")}
              placeholder={t("namePlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "name")}
            />

            <Input
              label={t("position")}
              placeholder={t("positionPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "position")}
            />

            <Input
              label={t("phone")}
              placeholder={t("phonePlaceholder")}
              {...getFieldProps(formik, schema, "phone")}
            />

            <Input
              label={t("email")}
              placeholder={t("emailPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "email")}
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

export default memo(ReferenceDialog);

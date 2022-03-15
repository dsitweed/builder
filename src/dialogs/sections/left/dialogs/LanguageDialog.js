import { Formik } from "formik";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Input from "../../../../components/shared/input/Input";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";

const initialValues = {
  name: "",
  fluency: "",
};

const LanguageDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    name: Yup.string().required(t("required")),
    fluency: Yup.string().required(t("required")),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataDialog
          name={t("language")}
          path="struct.languages.items"
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
              label={t("fluency")}
              placeholder={t("fluencyPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "fluency")}
            />
          </div>
        </DataDialog>
      )}
    </Formik>
  );
};

export default memo(LanguageDialog);

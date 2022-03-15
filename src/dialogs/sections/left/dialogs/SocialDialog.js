import { Formik } from "formik";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Input from "../../../../components/shared/input/Input";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";

const initialValues = {
  url: "",
  network: "",
};

const SocialDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    network: Yup.string().required(t("required")),
    url: Yup.string().url(t("urlValidation")),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataDialog
          path="struct.social.items"
          name={t("social")}
          {...{ open, setOpen, data, setData }}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("network")}
              className="col-span-1"
              placeholder={t("networkPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "network")}
            />

            <Input
              label={t("url")}
              className="col-span-1"
              placeholder={t("urlPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "url")}
            />
          </div>
        </DataDialog>
      )}
    </Formik>
  );
};

export default memo(SocialDialog);

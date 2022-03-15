import { Formik } from "formik";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Input from "../../../../components/shared/input/Input";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";
import TextareaInput from "../../../../components/shared/input/TextareaInput";

const initialValues = {
  title: "",
  summary: "",
};

const ResearchDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    title: Yup.string().required(t("required")),
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
          name={t("research")}
          path="struct.research.items"
          {...{ open, setOpen, data, setData }}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("title")}
              placeholder={t("titlePlaceholder")}
              className="col-span-2"
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "title")}
            />

            <TextareaInput
              label={t("summary")}
              placeholder={t("summaryPlaceholder")}
              className="col-span-2"
              {...getFieldProps(formik, schema, "summary")}
            />
          </div>
        </DataDialog>
      )}
    </Formik>
  );
};

export default memo(ResearchDialog);

import { Formik } from "formik";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Input from "../../../../components/shared/input/Input";
import TextareaInput from "../../../../components/shared/input/TextareaInput";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";

const initialValues = {
  name: "",
  summary: "",
};

const SkillDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    name: Yup.string().required(t("required")),
    summary: Yup.string(),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => {
        return (
          <DataDialog
            name={t("skill")}
            path="struct.skills.items"
            {...{ open, setOpen, data, setData }}
          >
            <div className="grid grid-cols-2 gap-8">
              <Input
                label={t("name")}
                className="col-span-2"
                placeholder={t("namePlaceholder")}
                isBoldLabel={true}
                {...getFieldProps(formik, schema, "name")}
              />

              <TextareaInput
                label={t("summary")}
                className="col-span-2"
                {...getFieldProps(formik, schema, "summary")}
              />
            </div>
          </DataDialog>
        );
      }}
    </Formik>
  );
};

export default memo(SkillDialog);

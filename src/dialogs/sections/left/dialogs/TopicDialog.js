import { Formik } from "formik";
import React, { memo } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Input from "../../../../components/shared/input/Input";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";
import TextareaInput from "../../../../components/shared/input/TextareaInput";

const initialValues = {
  title: "",
  programs: "",
  collaboration: "",
  studentNum: "",
  description: "",
};

const TopicDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    title: Yup.string().required(t("required")),
    programs: Yup.string().required(t("required")),
    collaboration: Yup.string(),
    studentNum: Yup.string(),
    description: Yup.string().min(10, t("minValidation", { number: 10 })),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataDialog
          name={t("topic")}
          path="struct.topic.items"
          {...{ open, setOpen, data, setData }}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("title")}
              className="col-span-2"
              placeholder={t("titlePlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "title")}
            />

            <Input
              label={t("programs")}
              className="col-span-2"
              placeholder={t("programsPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "programs")}
            />

            <Input
              label={t("collaboration")}
              placeholder={t("collaborationPlaceholder")}
              {...getFieldProps(formik, schema, "collaboration")}
            />

            <Input
              label={t("studentNum")}
              placeholder={t("studentNumPlaceholder")}
              {...getFieldProps(formik, schema, "studentNum")}
            />

            <TextareaInput
              label={t("description")}
              className="col-span-2"
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "description")}
            />
          </div>
        </DataDialog>
      )}
    </Formik>
  );
};

export default memo(TopicDialog);

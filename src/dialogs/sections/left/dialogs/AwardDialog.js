import { Formik } from "formik";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Input from "../../../../components/shared/input/Input";
import TextareaInput from "../../../../components/shared/input/TextareaInput";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";

const initialValues = {
  title: "",
  awarder: "",
  date: "",
  summary: "",
};

const AwardDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    title: Yup.string().required(t("required")),
    awarder: Yup.string().required(t("required")),
    date: Yup.date().max(new Date()),
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
          name={t("award")}
          path="struct.awards.items"
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
              label={t("awarder")}
              placeholder={t("awarderPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "awarder")}
            />

            <Input
              type="date"
              label={t("date")}
              {...getFieldProps(formik, schema, "date")}
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

export default memo(AwardDialog);

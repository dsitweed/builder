import { Formik } from "formik";
import React, { memo } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Input from "../../../../components/shared/input/Input";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";

const initialValues = {
  name: "",
};

const HobbyDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    name: Yup.string().required(t("required")),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataDialog
          name={t("hobby")}
          path="struct.hobbies.items"
          {...{ open, setOpen, data, setData }}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("name")}
              placeholder={t("namePlaceholder")}
              className="col-span-2"
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "name")}
            />
          </div>
        </DataDialog>
      )}
    </Formik>
  );
};

export default memo(HobbyDialog);

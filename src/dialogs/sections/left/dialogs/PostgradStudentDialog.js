import { Formik } from "formik";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Input from "../../../../components/shared/input/Input";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";

const initialValues = {
  fullName: "",
  courseId: "",
  classId: "",
  semester: "",
  program: "",
};

const PostgradStudentDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    fullName: Yup.string().required(t("required")),
    courseId: Yup.string().required(t("required")),
    classId: Yup.string().required(t("required")),
    semester: Yup.string().required(t("required")),
    program: Yup.string(),
    studentId: Yup.string().required(t("required")),
    topic: Yup.string().required(t("required")),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataDialog
          name={t("postgradStudents")}
          path="struct.postgradStudents.items"
          {...{ open, setOpen, data, setData }}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("fullNamePostgrad")}
              className="col-span-2"
              placeholder={t("namePostgradPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "fullName")}
            />

            <Input
              label={t("coursesId")}
              placeholder={t("coursesIdPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "courseId")}
            />

            <Input
              label={t("classId")}
              placeholder={t("classIdPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "classId")}
            />

            <Input
              label={t("semester")}
              placeholder={t("semesterPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "semester")}
            />

            <Input
              label={t("program")}
              placeholder={t("programPlaceholder")}
              {...getFieldProps(formik, schema, "program")}
            />
            <Input
              label={t("postgradId")}
              placeholder={t("postgradIdPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "studentId")}
            />
            <Input
              label={t("topic")}
              placeholder={t("topicPlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "topic")}
            />
          </div>
        </DataDialog>
      )}
    </Formik>
  );
};

export default memo(PostgradStudentDialog);

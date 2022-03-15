import { Formik } from "formik";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Input from "../../../../components/shared/input/Input";
import { getFieldProps } from "../../../../utils";
import DataDialog from "../../../DataDialog";

const initialValues = {
  name: "",
  courseId: "",
  classId: "",
  semester: "",
  program: "",
};

const CourseDialog = ({ open, setOpen, data, setData }) => {
  const { t } = useTranslation();

  const schema = Yup.object().shape({
    name: Yup.string().required(t("required")),
    courseId: Yup.string().required(t("required")),
    classId: Yup.string().required(t("required")),
    semester: Yup.string().required(t("required")),
    program: Yup.string(),
  });

  return (
    <Formik
      validateOnBlur
      initialValues={initialValues}
      validationSchema={schema}
    >
      {(formik) => (
        <DataDialog
          name={t("courses")}
          path="struct.courses.items"
          {...{ open, setOpen, data, setData }}
        >
          <div className="grid grid-cols-2 gap-8">
            <Input
              label={t("nameCourse")}
              className="col-span-2"
              placeholder={t("nameCoursePlaceholder")}
              isBoldLabel={true}
              {...getFieldProps(formik, schema, "name")}
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
          </div>
        </DataDialog>
      )}
    </Formik>
  );
};

export default memo(CourseDialog);

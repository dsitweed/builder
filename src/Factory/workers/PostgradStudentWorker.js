import { useTranslation } from "react-i18next";

export const PostgradStudentWorker1 = (undergradStudent) => {
  const { t } = useTranslation();

  return {
    title: `${undergradStudent?.fullName} - ${undergradStudent?.studentId} - ${undergradStudent?.program}`,
    subtitle: `${t("coursesId")}: ${undergradStudent?.courseId} - ${t(
      "classId"
    )}: ${undergradStudent?.classId}`,
    text: `${t("topic")}: ${undergradStudent?.topic}/ ${t("semester")}: ${
      undergradStudent?.semester
    }`,
  };
};

export const PostgradStudentWorker2 = () => {
  const { t } = useTranslation();

  return {
    titlePath: "fullName",
    subtitlePath: "studentId",
    subtitleFunction: (x) => {
      return `${t("postgradId")}: ${x}`;
    },
    textPath: "topic",
  };
};

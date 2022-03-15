import { useTranslation } from "react-i18next";

export const CoursesWorker1 = (courses) => {
  const { t } = useTranslation();

  return {
    title: courses?.name,
    subtitle: `${t("coursesId")}: ${courses?.courseId} - ${t("classId")}: ${
      courses?.classId
    }`,
    text: courses?.semester,
  };
};

export const CoursesWorker2 = () => {
  const { t } = useTranslation();

  return {
    titlePath: "name",
    subtitlePath: "courseId",
    textPath: "classId",
    subtitleFunction: (x) => {
      return `${t("coursesId")}: ${x}`;
    },
    textFunction: (x) => {
      return `${t("classId")}: ${x}`;
    },
  };
};

import { useTranslation } from "react-i18next";

export const ProjectWork1 = (project) => {
  const { t } = useTranslation();

  return {
    title: project?.title,
    subtitle: `${t("author")}: ${project?.authors}`,
    text: project?.summary,
    date: project?.issuedDate,
  };
};

export const ProjectWork2 = () => {
  const { t } = useTranslation();

  return {
    titlePath: "title",
    subtitlePath: "authors",
    textPath: "issuedDate",
    textFunction: (x) => `${t("issuedDate")}: ${x}`,
  };
};

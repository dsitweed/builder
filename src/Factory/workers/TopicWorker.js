import { useTranslation } from "react-i18next";

export const TopicWorker1 = (topic) => {
  const { t } = useTranslation();

  return {
    title: `${topic.title} - ${topic.programs}`,
    subtitle: `${t("collaboration")}: ${topic.collaboration} - ${t(
      "studentNum"
    )}: ${topic.studentNum}`,
    text: topic.description,
  };
};

export const TopicWorker2 = () => {
  return {
    titlePath: "title",
    textPath: "description",
  };
};

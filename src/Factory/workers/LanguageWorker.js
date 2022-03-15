export const LanguageWorker1 = (language) => {
  return {
    title: language?.name,
    subtitle: language?.fluency,
  };
};

export const LanguageWorker2 = () => {
  return {
    titlePath: "name",
    subtitlePath: "fluency",
  };
};

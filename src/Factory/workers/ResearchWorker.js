export const ResearchWorker1 = (research) => {
  return {
    title: research?.title,
    subtitle: "",
    text: research?.summary,
  };
};

export const ResearchWorker2 = () => {
  return {
    titlePath: "title",
    textPath: "summary",
  };
};

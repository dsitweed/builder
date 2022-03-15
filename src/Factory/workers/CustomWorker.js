export const CustomWorker1 = (custom) => {
  return {
    title: custom?.title,
    subtitle: custom?.city,
    text: custom?.summary,
    dateStart: custom?.startDate,
    dateEnd: custom?.endDate,
  };
};

export const CustomWorker2 = () => ({
  titlePath: "title",
  subtitlePath: "city",
  textPath: "summary",
});

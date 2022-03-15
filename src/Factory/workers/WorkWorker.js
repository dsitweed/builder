export const WorkWorker1 = (work) => ({
  title: work?.company,
  subtitle: work?.position,
  text: work?.summary,
  dateStart: work?.startDate,
  dateEnd: work?.endDate,
});

export const WorkWorker2 = () => ({
  titlePath: "company",
  textPath: "summary",
});

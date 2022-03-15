export const AwardWorker1 = (award) => ({
  title: award?.title,
  subtitle: award?.awarder,
  text: award?.summary,
  date: award?.date,
});

export const AwardWorker2 = () => ({
  titlePath: "title",
  subtitlePath: "awarder",
  textPath: "summary",
});

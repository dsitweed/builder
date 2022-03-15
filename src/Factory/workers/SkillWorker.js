export const SkillWorker1 = (skill) => ({
  title: skill?.name,
  text: skill?.summary,
});

export const SkillWorker2 = () => ({
  titlePath: "name",
  subtitlePath: "summary",
});

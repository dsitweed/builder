export const EducationWorker1 = (education) => ({
  title: education?.institution,
  subtitle: `${education?.degree ? education?.degree : ""} ${
    education?.field ? education?.field : ""
  } ${education?.gpa ? education?.gpa : ""}`,
  text: education?.summary,
  dateStart: education?.startDate,
  dateEnd: education?.endDate,
});

export const EducationWorker2 = () => ({
  titlePath: "institution",
  textPath: "field",
});

export const CertificationWork1 = (certifications) => {
  return {
    title: certifications?.title,
    subtitle: certifications?.issuer,
    text: certifications?.summary,
    dateStart: certifications?.issueDate,
    dateEnd: certifications?.endDate,
  };
};

export const CertificationWork2 = () => ({
  titlePath: "title",
  subtitlePath: "issuer",
  textPath: "summary",
});

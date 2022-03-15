export const ReferenceWork1 = (reference) => {
  return {
    title: `${reference?.name} - ${reference?.position}`,
    subtitle: `${reference?.phone} - ${reference?.email}`,
    text: reference?.summary,
  };
};

export const ReferenceWork2 = () => ({
  titlePath: "name",
  subtitlePath: "position",
  textPath: "summary",
});

import React from "react";
import Template1 from "../../../templates/templates/Template1";

const Display = ({ templateName, data }) => {
  if (templateName === "Template1") return <Template1 data={data} />;
};

const ArtBoardItem = ({ templateName, data }) => {
  return <Display {...{ templateName, data }} />;
};

export default ArtBoardItem;

import React from "react";

export const PublicationWorker1 = (publication) => {
  return {
    title: (
      <a href={publication?.url} target="_blank" rel="noreferrer">
        {publication?.title}
      </a>
    ),
    subtitle: publication?.authors,
    text: publication?.summary,
    date: publication?.issuedDate,
  };
};

export const PublicationWorker2 = () => ({
  titlePath: "title",
  subtitlePath: "authors",
  textPath: "url",
  textFunction: (x) => {
    return (
      <a style={{ color: "white" }} href={x} target="_blank" rel="noreferrer">
        Link
      </a>
    );
  },
});

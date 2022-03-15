import React from "react";

import ArtBoardItem from "./ArtBoardItem";
import { useResumeSelector } from "../../../contexts/ResumeContext";
import styles from "./ArtBoard.module.css";

const ArtBoard = () => {
  const state = useResumeSelector();

  return (
    <>
      {state ? (
        <div
          id="page"
          className={styles.container}
          style={{
            fontFamily: state.options?.font,
            color: state.options?.colors?.text,
            background: state.options?.colors?.background,
            fontSize: state.options?.fontSize,
          }}
        >
          <ArtBoardItem templateName={state.templateName} data={state} />
        </div>
      ) : null}
    </>
  );
};

export default ArtBoard;

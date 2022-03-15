import React, { memo } from "react";
import Preview from "./components/preview";
import SaveCv from "./components/saveCv";
import Template from "./components/template";
import ShareCv from "./components/shareCv";
import ImportData from "./components/importData";
import DownloadCv from "./components/downloadCv";
import Setting from "./components/setting";

import styles from "./RightSidebar.module.css";

const RightSidebar = ({ pdf }) => {
  return (
    <div className="flex flex-col">
      <div className={styles.container}>
        <div className="grid grid-cols-1 gap-4 text-primary-500 space-y-5">
          <Preview />
          <SaveCv />
          <Template />
          <ShareCv />
          <ImportData />
          <DownloadCv pdf={pdf} />
          <Setting />
        </div>
      </div>
    </div>
  );
};
export default memo(RightSidebar);

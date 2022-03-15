import React, { memo, useRef } from "react";
import { AiFillCamera } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { handleKeyUp } from "../../../utils";
import Input from "../input/Input";
import cx from "classnames";
import { IconButton } from "@material-ui/core";
import { useResumeDispatch } from "../../../contexts/ResumeContext";
import { uploadPhotograph } from "../../../services/firebase";

import styles from "./PhotoUpload.module.css";

const PhotoUpload = ({ className }) => {
  const fileInputRef = useRef(null);
  const dispatch = useResumeDispatch();
  const { t } = useTranslation();

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    uploadPhotograph(file, dispatch, t);
  };

  return (
    <div className={cx(className, "flex items-center")}>
      <div
        role="button"
        tabIndex="0"
        className={styles.circle}
        onClick={() => handleIconClick()}
        onKeyUp={(e) => handleKeyUp(e, handleIconClick)}
      >
        <IconButton>
          <AiFillCamera
            size="20px"
            className="text-gray-900 hover:text-blue-700"
          />
        </IconButton>
        <input
          name="file"
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      <Input
        name="photograph"
        label={t("photograph")}
        className="pl-6 w-full invisible hidden"
        path="struct.profile.photograph"
      />
    </div>
  );
};

export default memo(PhotoUpload);

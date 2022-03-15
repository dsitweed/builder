import React, { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSharedCode } from "../../../api/request/cv";
import { ToastError } from "../../../components/CustomToast";
import { BUILDER_URL, CV_ID, JWT } from "../../../constants/CommonConstants";
import { GetItem } from "../../../services/clientStorage";
import BaseDialog from "../../BaseDialog";
import { CopyToClipboard } from "react-copy-to-clipboard";
import BaseTooltip from "../../../components/shared/tooltip/BaseTooltip";
import { BiCopy } from "react-icons/bi";
import styles from "../../BaseDialog.module.css";
import { IconButton } from "@material-ui/core";

const SharedCvDialog = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(true);
  const [tooltip, setTooltip] = useState("Copy");

  const divCopied = useRef(null);

  useEffect(() => {
    (async () => {
      if (open === true) {
        let sharedCode = await getSharedCode(
          GetItem(CV_ID),
          GetItem(JWT),
          show
        );
        console.log("🚀 ~ file: SharedCvDialog.js ~ line 30 ~ sharedCode", sharedCode)
        if (!sharedCode.status) {
          ToastError(t("doesNotExist"));
          return null;
        }
        setUrl(
          `${BUILDER_URL}/app/share-cv?code=${
            sharedCode.data.share_code
          }&cvId=${GetItem(CV_ID)}`
        );
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, show]);

  const handleOptionClick = () => {
    setShow(!show);
  };

  return (
    <BaseDialog
      hideActions
      cancelTitle={t("done")}
      state={[open, setOpen]}
      title={t("shareHeading")}
    >
      <div className="flex relative">
        <input readOnly type="text" value={url} className={styles.shareInput} />
        <BaseTooltip title={tooltip} placement="top">
          <CopyToClipboard
            text={url}
            onCopy={() => {
              setTooltip("Copied");
              setTimeout(() => {
                setTooltip("Copy");
              }, 1000);
            }}
          >
            <IconButton size="medium">
              <BiCopy />
            </IconButton>
          </CopyToClipboard>
        </BaseTooltip>
        <div
          ref={divCopied}
          className="flex justify-center w-full absolute invisible"
        >
          <div className="bg-blue-200 w-1/6 text-center">{t("copied")}</div>
        </div>
      </div>
      <div className="flex my-5 justify-center">
        <button
          onClick={() => handleOptionClick()}
          className={styles.accuracyButton}
        >
          {show ? t("settingAccuracyShow") : t("settingAccuracyHide")}
        </button>
      </div>
    </BaseDialog>
  );
};

export default memo(SharedCvDialog);

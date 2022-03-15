import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSave } from "react-icons/bi";
import FunctionIcon from "../../../../components/shared/tooltip/FunctionIcon";
import SaveCVDialog from "../../../../dialogs/sections/right/SaveCVDialog";
import styles from "../RightSidebar.module.css";

const SaveCv = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <FunctionIcon
        title={t("save-cv")}
        onDivClick={() => setOpen(true)}
        className={styles.icon}
      >
        <BiSave className="hover:text-blue-500" size="20px" />
      </FunctionIcon>
      <SaveCVDialog {...{ open, setOpen }} />
    </>
  );
};

export default SaveCv;

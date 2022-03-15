import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiShareAlt } from "react-icons/bi";
import FunctionIcon from "../../../../components/shared/tooltip/FunctionIcon";
import SharedCvDialog from "../../../../dialogs/sections/right/SharedCvDialog";
import styles from "../RightSidebar.module.css";

const ShareCv = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <FunctionIcon
        title={t(`share`)}
        onDivClick={() => setOpen(true)}
        className={styles.icon}
      >
        <BiShareAlt className="hover:text-blue-500" size="20px" />
      </FunctionIcon>
      <SharedCvDialog {...{ open, setOpen }} />
    </>
  );
};

export default ShareCv;

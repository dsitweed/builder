import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSetting } from "react-icons/ai";
import FunctionIcon from "../../../../components/shared/tooltip/FunctionIcon";
import styles from "../RightSidebar.module.css";

const Setting = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <FunctionIcon
        title={t("settings")}
        onDivClick={() => setOpen(true)}
        className={styles.icon}
      >
        <AiOutlineSetting className="hover:text-blue-500" size="20px" />
      </FunctionIcon>
    </>
  );
};

export default Setting;

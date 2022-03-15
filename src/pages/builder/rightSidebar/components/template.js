import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineTemplate } from "react-icons/hi";
import FunctionIcon from "../../../../components/shared/tooltip/FunctionIcon";
import TemplateDialog from "../../../../dialogs/sections/right/TemplateDialog";
import styles from "../RightSidebar.module.css";

const Template = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <FunctionIcon
        title={t(`templates`)}
        onDivClick={() => setOpen(true)}
        className={styles.icon}
      >
        <HiOutlineTemplate className="hover:text-blue-500" size="20px" />
      </FunctionIcon>
      <TemplateDialog {...{ open, setOpen }} />
    </>
  );
};

export default Template;

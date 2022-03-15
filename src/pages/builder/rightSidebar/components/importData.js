import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFilePlus } from "react-icons/bs";
import FunctionIcon from "../../../../components/shared/tooltip/FunctionIcon";
import ImportDialog from "../../../../dialogs/sections/right/ImportDialog";
import styles from "../RightSidebar.module.css";

const ImportData = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <FunctionIcon
        title={t(`import`)}
        onDivClick={() => setOpen(true)}
        className={styles.icon}
      >
        <BsFilePlus className="hover:text-blue-500" size="20px" />
      </FunctionIcon>
      <ImportDialog {...{ open, setOpen }} />
    </>
  );
};

export default ImportData;

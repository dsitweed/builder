import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineFilePdf } from "react-icons/ai";
import SettingContext from "../../../../contexts/SettingContext";
import FunctionIcon from "../../../../components/shared/tooltip/FunctionIcon";
import { savePDF } from "@progress/kendo-react-pdf";
import {
  APP_NAME,
  CV_PDF,
} from "../../../../constants/CommonConstants";
import styles from "../RightSidebar.module.css";

const DownloadCv = ({ pdf }) => {
  const { t } = useTranslation();
  const { setMode } = useContext(SettingContext);

  const exportPDF = () => {
    setMode(CV_PDF);
    let element = pdf.current || document.body;
    savePDF(element, {
      paperSize: "A4",
      scale: 0.7,
      fileName: APP_NAME,
    });
  };

  return (
    <FunctionIcon
      title={t(`pdf`)}
      onDivClick={() => {}}
      className={styles.icon}
    >
      <AiOutlineFilePdf
        className="hover:text-blue-500"
        size="20px"
        onClick={() => exportPDF()}
      />
    </FunctionIcon>
  );
};

export default DownloadCv;

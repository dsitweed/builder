import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { VscOpenPreview } from "react-icons/vsc";
import { Link } from "react-router-dom";
import FunctionIcon from "../../../../components/shared/tooltip/FunctionIcon";
import { CV_ID, JWT, USER_ID } from "../../../../constants/CommonConstants";
import { GetItem } from "../../../../services/clientStorage";
import styles from "../RightSidebar.module.css";

const Preview = () => {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const cvId = GetItem(CV_ID, "local");
    const auth = GetItem(JWT, "local");
    const userId = GetItem(USER_ID, "local");
    setUrl(`/app/preview/?cvId=${cvId}&auth=${auth}&userId=${userId}`);
  }, []);

  return (
    <FunctionIcon title={t("preview")} className={styles.icon}>
      <Link to={url}>
        <VscOpenPreview className="hover:text-blue-500" size="20px" />
      </Link>
    </FunctionIcon>
  );
};

export default Preview;

import { Container } from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSharedData } from "../../api/request/cv";
import { ToastError } from "../../components/CustomToast";
import LoadingScreen from "../../components/pages/LoadingScreen";
import { scaler } from "../../utils";
import ArtBoardItem from "../builder/center/ArtBoardItem";

const ShareCv = () => {
  const { t, i18n } = useTranslation();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const query = new URLSearchParams(window.location.search);
      const code = query.get("code");
      const cvId = query.get("cvId");
      if (!code || !cvId) {
        ToastError(t("doesNotExist"));
        return null;
      }
      const cvData = await getSharedData(cvId, code);
      if (!cvData.status) {
        ToastError(t("doesNotExist"));
        return null;
      }
      const data = cvData.data;
      const fontSizeOptions = data.options.fontSizeOptions;
      setResume(data);
      i18n.changeLanguage(data.options.language || "vi");
      for (const [key, sizeDefault] of Object.entries(fontSizeOptions)) {
        document.documentElement.style.setProperty(
          key,
          `${scaler(data.options.fontSize) * sizeDefault}rem`
        );
      }
      return setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(() => {
    if (loading) {
      return <LoadingScreen />;
    }
    return (
      <Container>
        <ArtBoardItem templateName={resume.templateName} data={resume} />
      </Container>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default ShareCv;

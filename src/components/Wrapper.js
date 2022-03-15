import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { APP_NAME, FRONTEND_URL } from "../constants/CommonConstants";

const Wrapper = ({ pathname, children }) => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <html lang="en" />
        {pathname === "/app/builder" && (
          <title>{`${t("editPage")} | ${APP_NAME}`}</title>
        )}
        {pathname === "/app/preview" && (
          <title>{`${t("previewPage")} | ${APP_NAME}`}</title>
        )}
        {pathname === "/app/share-cv" && (
          <title>{`${t("shareCvPage")} | ${APP_NAME}`}</title>
        )}

        <meta
          name="description"
          content="A free and open source resume builder that’s built to make the mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3."
        />
        <link rel="canonical" href={`${FRONTEND_URL}`} />
        <meta property="og:url" content={`${FRONTEND_URL}`} />
        <meta property="og:type" content="website" />
      </Helmet>
      {children}
    </>
  );
};

export default Wrapper;

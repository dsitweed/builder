import { Dialog, Fade } from "@material-ui/core";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import LOGO from "../../assets/images/logo.png";

const LoadingScreen = () => {
  const { t } = useTranslation();
  const ran = Math.floor(Math.random() * 10 + 1);

  return (
    <Dialog open hideBackdrop>
      <Fade in>
        <div className="w-screen h-screen flex justify-center items-center outline-none">
          <div className="flex flex-col items-center">
            <img src={LOGO} alt="" width="150px" />
            <span className="mt-2 font-medium opacity-75">
              Tip #{ran}: {t(`tip${ran}`)}
            </span>
          </div>
        </div>
      </Fade>
    </Dialog>
  );
};

export default memo(LoadingScreen);

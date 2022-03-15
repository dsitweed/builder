import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useResumeDispatch } from "../../../contexts/ResumeContext";
import { ResumeEvent } from "../../../constants/ContextEvent";
import BaseDialog from "../../BaseDialog";
import styles from "../../BaseDialog.module.css";
import { ToastError, ToastSuccess } from "../../../components/CustomToast";
import { updateCvTemplate } from "../../../api/request/cv";
import { getListTemplates } from "../../../api/request/template";
import { CV_ID, TEMPLATE_ID, JWT } from "../../../constants/CommonConstants";
import { GetItem, SetItem } from "../../../services/clientStorage";

const TemplateDialog = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const dispatch = useResumeDispatch();
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    (async () => {
      if (open) {
        const result = await getListTemplates(GetItem(JWT));
        if (result.status) {
          setTemplates(result.data);
        }
      }
    })();
  }, [open]);

  const handleChangeTemplate = (templateId) => {
    updateCvTemplate(GetItem(CV_ID), templateId, GetItem(JWT))
      .then((res) => {
        if (res.status) {
          dispatch({ type: ResumeEvent.INIT_DATA, payload: res.data });
          SetItem(TEMPLATE_ID, templateId, "local");
          ToastSuccess(t("templateSuccess"));
        } else {
          ToastError(res.data);
        }
        setOpen(false);
      })
      .catch((error) => {
        ToastError(error);
      });
  };

  return (
    <BaseDialog
      hideActions
      state={[open, setOpen]}
      title={t("templateHeading")}
      style={{ width: "900px" }}
    >
      {templates.length > 0 ? (
        <div className="grid grid-cols-3 gap-8">
          {templates.map((x, index) => (
            <div className={styles.cvTemplate}>
              <div className={styles.cvContent}>
                <div
                  className="flex flex-wrap no-underline hover:no-underline w-full"
                  style={{ maxHeight: "330px", height: "330px" }}
                >
                  <img alt={"#"} src={x.imgUrl} className="w-full h-full" />
                </div>
                <div className={styles.overlay}></div>
                <div className={styles.cvMeta}>
                  <div className="my-10">
                    <span className="text-white font-bold text-lg">
                      {x.templateName}
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    <div
                      className="flex flex-col items-center"
                      title={`${x.metadata.used} ${t("templateUsed")}`}
                    >
                      <svg
                        className="h-8 w-8 cursor-pointer animate-bounce hover:animate-wiggle-scale transition duration-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                        />
                      </svg>
                      <span className="text-xs text-center text-white">
                        {x.metadata.used} {t("templateUsed")}
                      </span>
                    </div>
                  </div>
                  <button
                    className="border-white border-2 rounded-3xl text-white mt-10 py-2 px-6 transform scale-90 transition duration-500 hover:scale-100 focus:outline-none"
                    onClick={() => handleChangeTemplate(x.id)}
                  >
                    {t("templateText")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>{t("noTemplate")}</h1>
      )}
    </BaseDialog>
  );
};

export default memo(TemplateDialog);

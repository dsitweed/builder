import { cloneDeep } from "lodash";
import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSave } from "react-icons/bi";
import { updateCV } from "../../../api/request/cv";
import Button from "../../../components/shared/button/Button";
import { ToastError } from "../../../components/CustomToast";
import Input from "../../../components/shared/input/Input";
import { ResumeEvent } from "../../../constants/ContextEvent";
import {
  BUILDER_URL,
  CV_ID,
  JWT,
  USER_ID,
} from "../../../constants/CommonConstants";
import { useResumeDispatch, useResumeSelector } from "../../../contexts/ResumeContext";
import { GetItem } from "../../../services/clientStorage";
import BaseDialog from "../../BaseDialog";

const SaveCvDialog = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const state = useResumeSelector();
  const dispatch = useResumeDispatch();
  const [required, setRequired] = useState(false);

  const onChangeCVName = (e) => {
    const check = /^[\w,\s-]+/i.test(e.target.value);
    if (!check) setRequired(true);
    else setRequired(false);
    dispatch({
      type: ResumeEvent.ON_INPUT,
      payload: {
        path: "resumeName",
        value: e.target.value,
      },
    });
  };

  const handleSaveCv = async () => {
    if (!required) {
      const cvId = GetItem(CV_ID, "local");
      const auth = GetItem(JWT, "local");
      if (cvId === undefined || auth === undefined) {
        ToastError(t("doesNotExist"));
        return null;
      }
      let body = cloneDeep(state);
      delete body.options.fontOptions;
      delete body.options.fontSizeOptions;
      delete body.options.colorOptions;
      await updateCV(cvId, body, auth);
      setOpen(false);
      const userId = GetItem(USER_ID, "local");
      window.location.replace(
        `${BUILDER_URL}/app/preview?cvId=${cvId}&auth=${auth}&userId=${userId}`
      );
    } else ToastError(t("nameNotExist"));
  };

  return (
    <BaseDialog hideActions state={[open, setOpen]} title={t("save-cv")}>
      <section>
        <div className="bg-primary-100 rounded grid gap-5 p-8">
          <div>
            <Input
              isRequired={required}
              path={"resumeName"}
              label={`${t("name")} CV`}
              className="col-span-2"
              placeholder={t("enterTitle")}
              onChange={onChangeCVName}
            />
          </div>
          <div className="mt-4 flex justify-center">
            <Button icon={BiSave} onClick={() => handleSaveCv()}>
              {t("buttonSave")}
            </Button>
          </div>
        </div>
      </section>
    </BaseDialog>
  );
};

export default memo(SaveCvDialog);

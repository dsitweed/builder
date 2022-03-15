import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useResumeDispatch, useResumeSelector } from "../../../../contexts/ResumeContext";
import BaseDialog from "../../../BaseDialog";
import { ResumeEvent } from "../../../../constants/ContextEvent";
import Button from "../../../../components/shared/button/Button";
import TextareaInput from "../../../../components/shared/input/TextareaInput";

const SummaryDialog = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const modalRef = useRef(null);

  const dispatch = useResumeDispatch();
  const summaryBody = useResumeSelector(`struct.summary.body`);

  const [data, setData] = useState(summaryBody);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setData(summaryBody);
    } else {
      setData(null);
    }
  }, [open, summaryBody]);

  const onValueChanged = (e) => {
    setData(e.target.value);
  };

  const onSubmit = () => {
    setLoading(true);
    dispatch({
      type: ResumeEvent.ON_EDIT_SUMMARY,
      payload: {
        path: "struct.summary.body",
        value: data,
      },
    });
    setLoading(false);
    modalRef.current.handleClose();
  };

  const submitAction = (
    <Button type="submit" onClick={() => onSubmit()}>
      {loading ? t("loading") : `${t("edit")} ${t("summary")}`}
    </Button>
  );

  const onDestroy = () => {
    setData(null);
  };

  return (
    <BaseDialog
      ref={modalRef}
      action={submitAction}
      onDestroy={onDestroy}
      state={[open, setOpen]}
      title={`${t("edit")} ${t("summary")}`}
    >
      <div className="grid grid-cols-1 gap-8">
        <TextareaInput
          value={data}
          label={t("summary")}
          className="col-span-1"
          onChange={onValueChanged}
        />
      </div>
    </BaseDialog>
  );
};

export default SummaryDialog;

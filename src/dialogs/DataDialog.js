import { useFormikContext } from "formik";
import { isEmpty, isFunction } from "lodash";
import React, { memo, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import Button from "../components/shared/button/Button";
import { useResumeDispatch } from "../contexts/ResumeContext";
import { ResumeEvent } from "../constants/ContextEvent";
import { getModalText } from "../utils";
import { ToastError } from "../components/CustomToast";
import BaseDialog from "./BaseDialog";

const DataDialog = ({
  name,
  path,
  title,
  onEdit,
  onCreate,
  children,
  style,
  open,
  setOpen,
  data,
  setData,
}) => {
  const modalRef = useRef(null);
  const dispatch = useResumeDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isEditMode, setEditMode] = useState(false);

  const { values, setValues, resetForm, validateForm } = useFormikContext();

  useEffect(() => {
    data && setValues(data) && setEditMode(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = async (newData) => {
    setLoading(true);
    const errors = await validateForm();

    if (isEmpty(errors)) {
      if (isEditMode) {
        if (data !== newData) {
          isFunction(onEdit)
            ? await onEdit(newData)
            : dispatch({
                type: ResumeEvent.ON_EDIT_ITEM,
                payload: {
                  path,
                  value: newData,
                },
              });
        }
      } else {
        newData.id = uuidv4();

        isFunction(onCreate)
          ? await onCreate(newData)
          : dispatch({
              type: ResumeEvent.ON_ADD_ITEM,
              payload: {
                path,
                value: newData,
              },
            });
      }

      setLoading(false);
      modalRef.current.handleClose();
    } else {
      ToastError(t("formErrors"));
      setLoading(false);
    }
  };

  const getTitle = isEmpty(title)
    ? getModalText(isEditMode, name, t)
    : isEditMode
    ? title.edit
    : title.create;

  const submitAction = (
    <Button type="submit" onClick={() => onSubmit(values)}>
      {loading ? t("loading") : getTitle}
    </Button>
  );

  const onDestroy = () => {
    resetForm();
    setEditMode(false);
    setData(null);
  };

  return (
    <BaseDialog
      ref={modalRef}
      action={submitAction}
      onDestroy={onDestroy}
      state={[open, setOpen]}
      title={getTitle}
      style={style}
    >
      {children}
    </BaseDialog>
  );
};

export default memo(DataDialog);

import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../../../../components/shared/heading/Heading";
import { BiEditAlt, BiHide, BiShow } from "react-icons/bi";
import { useResumeDispatch } from "../../../../contexts/ResumeContext";
import Input from "../../../../components/shared/input/Input";
import { ResumeEvent } from "../../../../constants/ContextEvent";
import cx from "classnames";
import BaseTooltip from "../../../../components/shared/tooltip/BaseTooltip";
import TextareaInput from "../../../../components/shared/input/TextareaInput";
import SummaryModal from "../../../../dialogs/sections/left/dialogs/SummaryDialog";

import styles from "./section.module.css";

const Summary = ({ id }) => {
  const { t } = useTranslation();
  const visible = `struct.${id}.visible`;

  const [isShow, setHide] = useState(true);
  const [open, setOpen] = useState(false);
  const dispatch = useResumeDispatch();

  const onDisplay = () => {
    dispatch({
      type: ResumeEvent.ON_DISPLAY_SECTION,
      payload: { path: visible },
    });
    isShow ? setHide(false) : setHide(true);
  };

  const handleEdit = () => setOpen(true);

  return (
    <>
      <section>
        <div className={styles.headingItem}>
          <Heading id={id} className="flex-initial cursor-pointer" />
          {isShow ? (
            <div className="cursor-pointer" onClick={() => onDisplay()}>
              <BiShow className={styles.iconAnimation} size="20px" />
            </div>
          ) : (
            <div className="cursor-pointer" onClick={() => onDisplay()}>
              <BiHide className={styles.iconAnimation} size="20px" />
            </div>
          )}
          <BaseTooltip
            onClick={() => handleEdit()}
            title={t("edit")}
            placement="top"
            arrow
          >
            <div className={cx(styles.hideItem, "cursor-pointer")}>
              <BiEditAlt className={styles.iconAnimation} size="20px" />
            </div>
          </BaseTooltip>
        </div>

        <Input
          name="heading"
          label={t("heading")}
          path={`struct.${id}.heading`}
        />

        <TextareaInput label={t("summary")} path={`struct.${id}.body`} />
      </section>
      <SummaryModal open={open} setOpen={setOpen} />
    </>
  );
};

export default memo(Summary);

import React, { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiDeleteBin4Line } from "react-icons/ri";
import { BiHide, BiShow } from "react-icons/bi";
import { ResumeEvent } from "../../../../constants/ContextEvent";
import {
  useResumeDispatch,
  useResumeSelector,
} from "../../../../contexts/ResumeContext";
import { LeftSideFactory } from "../../../../Factory/BlockFactory";
import Heading from "../../../../components/shared/heading/Heading";
import Input from "../../../../components/shared/input/Input";
import BaseTooltip from "../../../../components/shared/tooltip/BaseTooltip";
import LeftDialogSelector from "../../../../dialogs/sections/left/LeftDialogSelector";
import List from "../list/List";
import cx from "classnames";

import styles from "./section.module.css";

const LeftSection = ({ id, event }) => {
  const path = `struct.${id}.items`;
  const visible = `struct.${id}.visible`;
  const leftData = LeftSideFactory(id);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState(false);

  const state = useResumeSelector(visible, []);
  const [isShow, setHide] = useState(state);
  const { t } = useTranslation();

  const dispatch = useResumeDispatch();

  const onDisplay = () => {
    dispatch({
      type: ResumeEvent.ON_DISPLAY_SECTION,
      payload: { path: visible },
    });
    isShow ? setHide(false) : setHide(true);
  };

  const handleDeleteSection = () => {
    dispatch({
      type: ResumeEvent.ON_INPUT,
      payload: {
        path: `sections.${id}`,
        value: false,
      },
    });
  };

  const handleAdd = () => setOpen(true);

  return (
    <>
      <section>
        <div className={styles.headingItem}>
          <Heading
            id={id}
            className="flex-initial inline-block cursor-pointer items-center"
          />
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
            onClick={() => handleAdd()}
            title={t("add")}
            placement="top"
            arrow
          >
            <div className={cx(styles.hideItem, "cursor-pointer")}>
              <IoMdAddCircleOutline
                className={styles.iconAnimation}
                size="20px"
              />
            </div>
          </BaseTooltip>
          <BaseTooltip
            onClick={() => handleDeleteSection()}
            title={t("delete")}
            placement="top"
            arrow
          >
            <div className={cx(styles.hideItem, "cursor-pointer")}>
              <RiDeleteBin4Line className={styles.iconAnimation} size="20px" />
            </div>
          </BaseTooltip>
        </div>

        <Input
          name="heading"
          label={t("heading")}
          path={`struct.${id}.heading`}
        />

        <List
          path={path}
          event={event}
          {...leftData}
          {...{ setOpen, setData }}
        />
      </section>
      <LeftDialogSelector {...{ id, open, setOpen, data, setData }} />
    </>
  );
};

export default memo(LeftSection);

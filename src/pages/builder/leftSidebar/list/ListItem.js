import React, { memo, useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useResumeDispatch } from "../../../../contexts/ResumeContext";
import { ResumeEvent } from "../../../../constants/ContextEvent";
import { isFunction } from "lodash";
import cx from "classnames";
import ToggleButton from "../../../../components/shared/button/ToggleButton";
import Button from "../../../../components/shared/button/Button";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin4Line } from "react-icons/ri";

import styles from "./ListItem.module.css";

const ListItem = ({
  id,
  title,
  titleFunction,
  subtitle,
  subtitleFunction,
  text,
  textFunction,
  path,
  data,
  isFirst,
  isLast,
  onEdit,
}) => {
  const [isShow, setHide] = useState(data["visible"]);
  const [isHover, setHover] = useState(false);
  const dispatch = useResumeDispatch();

  useEffect(() => {
    setHide(data["visible"]);
  }, [data]);

  const onDisplay = () => {
    dispatch({
      type: ResumeEvent.ON_DISPLAY_ITEM,
      payload: { path: path, value: data, visible: isShow },
    });
    isShow ? setHide(false) : setHide(true);
  };

  const handleEdit = () => {
    onEdit();
  };

  const handleMoveUp = () => {
    dispatch({
      type: ResumeEvent.ON_MOVE_ITEM_UP,
      payload: {
        path,
        value: data,
      },
    });
  };

  const handleMoveDown = () => {
    dispatch({
      type: ResumeEvent.ON_MOVE_ITEM_DOWN,
      payload: {
        path,
        value: data,
      },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: ResumeEvent.ON_DELETE_ITEM,
      payload: {
        path,
        value: data,
      },
    });
  };

  return (
    <div className={cx(styles.list, styles.animationItem)} id={id}>
      <div
        className={styles.listItem}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={cx(styles.listItemGrid, {
            [styles.listItemGridHover]: isHover,
          })}
        >
          <span className="font-medium truncate">
            {isFunction(titleFunction) ? titleFunction(title) : title}
          </span>
          {subtitle && (
            <span className="mt-1 text-sm opacity-75 truncate">
              {isFunction(subtitleFunction)
                ? subtitleFunction(subtitle)
                : subtitle}
            </span>
          )}
          {text && (
            <span className="w-4/5 mt-1 text-sm opacity-75 truncate">
              {isFunction(textFunction) ? textFunction(text) : text}
            </span>
          )}
        </div>
        <div className={cx(styles.menu, { [styles.menuHover]: isHover })}>
          <Button
            outline
            className={styles.buttonFunction}
            isStyleIcon={false}
            isDisabled={isLast}
            icon={IoIosArrowDown}
            onClick={() => handleMoveDown()}
          />
          <Button
            outline
            className={styles.buttonFunction}
            isStyleIcon={false}
            isDisabled={isFirst}
            icon={IoIosArrowUp}
            onClick={() => handleMoveUp()}
          />
          <Button
            outline
            className={styles.buttonFunction}
            isStyleIcon={false}
            icon={BiEditAlt}
            onClick={() => handleEdit()}
          />
          <Button
            outline
            className={styles.buttonFunction}
            isStyleIcon={false}
            icon={RiDeleteBin4Line}
            onClick={() => handleDelete()}
          />
        </div>
      </div>
      <div className={styles.buttonItem}>
        <ToggleButton isShow={isShow} onDisplay={onDisplay} />
      </div>
    </div>
  );
};

export default memo(ListItem);

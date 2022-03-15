import { Backdrop, Dialog, Fade } from "@material-ui/core";
import { isFunction } from "lodash";
import React, { forwardRef, memo, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";
import { MdClose } from "react-icons/md";
import Button from "../components/shared/button/Button";
import { handleKeyUp } from "../utils";
import cx from "classnames";
import styles from "./BaseDialog.module.css";

const BaseDialog = forwardRef(
  (
    {
      title,
      cancelTitle,
      state,
      children,
      action,
      actionStyle,
      hideActions = false,
      handleActionClose,
      onDestroy,
      style,
      theme,
    },
    ref
  ) => {
    const [open, setOpen] = state;
    const { t } = useTranslation();

    const handleClose = () => {
      setOpen(false);

      setTimeout(() => {
        isFunction(onDestroy) && onDestroy();
      }, 250);
    };

    const handleActionCloseClick = () => {
      if (isFunction(handleActionClose)) handleActionClose();
      handleClose();
    };

    useImperativeHandle(ref, () => ({ handleClose }));

    return (
      <Dialog
        open={open}
        closeAfterTransition
        onClose={handleClose}
        className={styles.root}
        BackdropComponent={Backdrop}
      >
        <Fade in={open}>
          <div
            className={styles.modal}
            style={style === undefined ? {} : style}
          >
            <div className={styles.title}>
              {title && <h2>{title}</h2>}
              {theme && <h1 className={styles.theme}>{theme}</h1>}
              <MdClose
                size="18"
                tabIndex="0"
                className={"stroke-current right-0"}
                onClick={() => handleClose()}
                onKeyUp={(e) => handleKeyUp(e, handleClose)}
              />
            </div>

            <div className={styles.body}>{children}</div>
            {!hideActions && (
              <div className={cx(styles.actions, actionStyle)}>
                <Button
                  className="mr-8"
                  onClick={() => handleActionCloseClick()}
                >
                  {cancelTitle ? cancelTitle : t("cancel")}
                </Button>
                {action}
              </div>
            )}
          </div>
        </Fade>
      </Dialog>
    );
  }
);

export default memo(BaseDialog);

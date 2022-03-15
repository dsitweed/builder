import cx from "classnames";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { handleKeyUp } from "../../../utils";
import styles from "./Button.module.css";

const Button = ({
  icon,
  onClick,
  outline,
  children,
  className,
  isLoading,
  isDelete,
  isDisabled = false,
  isStyleIcon = true,
}) => {
  const { t } = useTranslation();
  const Icon = icon;

  return (
    <button
      disabled={isDisabled}
      onKeyUp={(e) => handleKeyUp(e, onClick)}
      onClick={isLoading ? undefined : onClick}
      className={cx(styles.container, className, {
        [styles.outline]: outline,
        [styles.delete]: isDelete,
      })}
    >
      {icon && <Icon size="14" className={isStyleIcon ? "mr-3" : ""} />}
      {isLoading ? t("loading") : children}
    </button>
  );
};

export default memo(Button);

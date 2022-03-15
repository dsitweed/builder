import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";
import BaseTooltip from "./BaseTooltip";
import styles from "./tooltip.module.css";

const SectionIcon = ({ section, containerId, tooltipPlacement }) => {
  const { t } = useTranslation();
  const { id, icon: Icon } = section;

  return (
    <BaseTooltip title={t(`${id}`)} placement={tooltipPlacement} arrow>
      <Link
        spy
        smooth
        to={id}
        offset={-20}
        duration={500}
        containerId={containerId}
        activeClass="text-blue-500"
        className={styles.icon}
      >
        <Icon size="20px" />
      </Link>
    </BaseTooltip>
  );
};

export default memo(SectionIcon);

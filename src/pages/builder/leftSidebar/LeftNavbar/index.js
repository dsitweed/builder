import React from "react";
import { Element } from "react-scroll";
import { useResumeSelector } from "../../../../contexts/ResumeContext";
import sections from "../../../../assets/data/leftSections";
import SectionIcon from "../../../../components/shared/tooltip/SectionIcon";
import styles from "./LeftNavbar.module.css";

const LeftNavbar = () => {
  const displaySection = useResumeSelector("sections");

  return (
    <div className={styles.container}>
      <div className="grid grid-cols-1 gap-4 text-primary-500">
        {sections
          .filter((x) => {
            if (displaySection === undefined) return true;
            else return displaySection[x.id];
          })
          .map((x) => (
            <Element key={x.id}>
              <SectionIcon
                key={x.id}
                section={x}
                containerId="LeftSidebar"
                tooltipPlacement="right"
              />
            </Element>
          ))}
      </div>
    </div>
  );
};

export default LeftNavbar;

import React, { Fragment, memo } from "react";
import { Element } from "react-scroll";
import sections from "../../../assets/data/leftSections";
import LeftNavbar from "./LeftNavbar";
import Summary from "./sections/Summary";
import Profile from "./sections/Profile";
import LeftSection from "./sections/LeftSection";
import { useResumeSelector } from "../../../contexts/ResumeContext";
import { PROFILE, SUMMARY } from "../../../constants/SectionConstants";

import styles from "./LeftSidebar.module.css";

const LeftComponent = ({ id, event, component: Component }) => (
  <Fragment key={id}>
    <Element id={id} name={id}>
      <Component id={id} event={event} />
    </Element>
    <hr />
  </Fragment>
);

const SidebarSection = ({ id, event }) => {
  if (id === PROFILE)
    return <LeftComponent component={Profile} {...{ id, event }} />;
  else if (id === SUMMARY)
    return <LeftComponent component={Summary} {...{ id, event }} />;
  else return <LeftComponent component={LeftSection} {...{ id, event }} />;
};

const LeftSidebar = () => {
  const displaySection = useResumeSelector("sections");

  return (
    <div className="flex h-full">
      <LeftNavbar />
      <div id="LeftSidebar" className={styles.container}>
        {sections
          .filter((x) => {
            if (displaySection === undefined) return true;
            else return displaySection[x.id];
          })
          .map((element, index) => (
            <SidebarSection id={element.id} event={element.event} key={index} />
          ))}
      </div>
    </div>
  );
};

export default memo(LeftSidebar);

import * as styles from "./hook.module.css";
import { scroller } from "react-scroll";

export const onScroll = (id) => {
  scroller.scrollTo(id, {
    duration: 500,
    delay: 50,
    offset: -50,
    smooth: "easeInOutQuart",
    containerId: "LeftSidebar",
  });
  const item = document.getElementById(id);
  item.classList.add(styles.blockHighlight);
  setTimeout(() => {
    item.classList.remove(styles.blockHighlight);
  }, 3020);
};

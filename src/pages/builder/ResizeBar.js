import { useTranslation } from "react-i18next";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { BiMoveHorizontal, BiMoveVertical } from "react-icons/bi";
import BaseTooltip from "../../components/shared/tooltip/BaseTooltip";

import styles from "./builder.module.css";

const ResizeBar = ({ zoom, setZoom, wrapCVRef }) => {
  const { t } = useTranslation();
  let baseWidth, baseHeight;
  let scaleRange;

  const checkBaseBox = () => {
    if (!(baseWidth && baseHeight && scaleRange)) {
      const page = document.getElementById("page");
      if (!page) return;
      baseWidth = page.clientWidth;
      baseHeight = page.clientHeight;

      let scaleFitHeight =
        wrapCVRef.current.parentElement.clientHeight / baseHeight;
      let scaleMin = Math.min(0.5, scaleFitHeight / 2);
      let scaleMax = 2;
      scaleRange = [scaleMin, scaleMax];
    }
  };

  const resizeWrapCV = (scale) => {
    const wrapHeight = baseHeight * scale;
    const wrapWidth = baseWidth * scale + 2 * 14; // 2 * padding left-right of wrap_cv (1rem ~ 14px)
    let transformOrigin;
    if (wrapWidth > wrapCVRef.current.parentElement.clientWidth) {
      transformOrigin = "left top";
    } else {
      transformOrigin = "center top";
    }
    setZoom({ scale, transformOrigin });

    if (wrapWidth > wrapCVRef.current.parentElement.clientWidth) {
      wrapCVRef.current.style.width = `${wrapWidth}px`;
      wrapCVRef.current.classList.remove("flex", "justify-center");
    } else {
      wrapCVRef.current.style.width = null;
      wrapCVRef.current.classList.add("flex", "justify-center");
    }
    wrapCVRef.current.style.height = `${wrapHeight}px`;
  };

  const onZoomIn = () => {
    checkBaseBox();
    if (Math.abs(zoom.scale - scaleRange[1]) < 1e-4) return;
    let newZoom = zoom.scale + 0.1;
    if (newZoom > scaleRange[1]) newZoom = scaleRange[1];
    resizeWrapCV(newZoom);
  };

  const onZoomOut = () => {
    checkBaseBox();
    if (Math.abs(zoom.scale - scaleRange[0]) < 1e-4) return;
    let newZoom = zoom.scale - 0.1;
    if (newZoom < scaleRange[0]) newZoom = scaleRange[0];
    resizeWrapCV(newZoom);
  };

  const onFitWidth = () => {
    checkBaseBox();
    const width = wrapCVRef.current.parentElement.clientWidth - 2 * 14; // 2 * padding left-right of wrap_cv
    let scale = width / baseWidth;
    resizeWrapCV(scale);
  };

  const onFitHeight = () => {
    checkBaseBox();
    const height = wrapCVRef.current.parentElement.clientHeight - 2 * 14; // 2 * padding top-bottom of cv_building
    let scale = height / baseHeight;
    resizeWrapCV(scale);
  };

  return (
    <span className={styles.top_cv_building}>
      <div className={styles.zoom_box}>
        <BaseTooltip title={t("fitWidth")} arrow>
          <span
            className={`${styles.zoom_icon} ${styles.head}`}
            onClick={onFitWidth}
          >
            <BiMoveHorizontal />
          </span>
        </BaseTooltip>
        <BaseTooltip title={t("fitHeight")} arrow>
          <span className={styles.zoom_icon} onClick={onFitHeight}>
            <BiMoveVertical />
          </span>
        </BaseTooltip>
        <BaseTooltip title={t("zoomIn")} arrow>
          <span className={styles.zoom_icon} onClick={onZoomIn}>
            <AiOutlineZoomIn />
          </span>
        </BaseTooltip>
        <BaseTooltip title={t("zoomOut")} arrow>
          <span
            className={`${styles.zoom_icon} ${styles.last}`}
            onClick={onZoomOut}
          >
            <AiOutlineZoomOut />
          </span>
        </BaseTooltip>
      </div>
    </span>
  );
};

export default ResizeBar;

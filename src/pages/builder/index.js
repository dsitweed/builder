import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../components/pages/headers";
import LoadingScreen from "../../components/pages/LoadingScreen";
import { data_demo, user_demo } from "../../assets/data/demo";

import LeftSidebar from "./leftSidebar";
import RightSidebar from "./rightSidebar";
import ArtBoard from "./center";
import ResizeBar from "./ResizeBar";

import { getCV } from "../../api/request/cv";
import { getDetailSourceData } from "../../api/request/data";
import { getUserProfile } from "../../api/request/user";
import { ToastError } from "../../components/CustomToast";
import { useResumeDispatch } from "../../contexts/ResumeContext";
import { AccuracyEvent, ResumeEvent } from "../../constants/ContextEvent";
import { useAccuracyDispatch } from "../../contexts/AccuracyContext";
import { getBuilderQuery, updateURLParameter } from "../../utils";
import { GetItem, SetItem } from "../../services/clientStorage";
import {
  CV_ID,
  DEMO,
  JWT,
  FRONTEND_URL,
  MODE,
  USER_ID,
} from "../../constants/CommonConstants";
import cx from "classnames";

import * as styles from "./builder.module.css";

const Builder = () => {
  const dispatch = useResumeDispatch();
  const accuracyDispatch = useAccuracyDispatch();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [zoom, setZoom] = useState({
    scale: 1.0,
    transformOrigin: "center top",
  });
  const wrapCVRef = useRef(null);
  const pdfContainer = useRef(null);

  const InitCV = async (cvId, auth) => {
    const resume = await getCV(cvId, auth);
    if (!resume.status) {
      ToastError(resume.data);
      return setLoading(false);
    }
    dispatch({ type: ResumeEvent.INIT_DATA, payload: resume.data });
    if (resume.data.source_id) {
      const dataSource = await getDetailSourceData(resume.data.source_id, auth);
      if (dataSource.status) {
        accuracyDispatch({
          type: AccuracyEvent.INIT_ACCURACY,
          payload: dataSource.data.struct,
        });
      } else ToastError(dataSource.data);
    }
  };

  useEffect(
    () =>
      (async () => {
        if (MODE === DEMO) {
          dispatch({ type: ResumeEvent.INIT_DATA, payload: data_demo });
          setUser(user_demo);
          return setLoading(false);
        }
        const query = getBuilderQuery(window.location.search);
        updateURLParameter(window.location.href, [], [], ["auth"]);
        const userId = query.userId ? query.userId : GetItem(USER_ID);
        const auth = query.auth ? query.auth : GetItem(JWT);
        const cvId = query.cvId ? query.cvId : GetItem(CV_ID);
        if (auth === null || userId === null)
          window.location.replace(`${FRONTEND_URL}/unauthorized`);
        const data = await getUserProfile(auth);
        if (data.status) setUser(data.data);
        else window.location.replace(`${FRONTEND_URL}/unauthorized`);
        InitCV(cvId, auth);
        SetItem(USER_ID, userId);
        SetItem(JWT, auth);
        SetItem(CV_ID, cvId);
        return setLoading(false);
      })(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  const alertUser = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  return useMemo(() => {
    if (loading) {
      return <LoadingScreen />;
    }
    return (
      <div className="h-screen">
        <Header user={user} />
        <div className={styles.container}>
          <div id="leftSidebarCivizen" className={styles.left}>
            <LeftSidebar />
          </div>
          <div className={styles.center}>
            <div className={styles.cv_building}>
              <div
                className={cx(styles.wrap_cv, "flex justify-center")}
                ref={wrapCVRef}
                style={{ width: "848px" }}
              >
                <div
                  className={styles.effect}
                  style={{
                    transformOrigin: zoom.transformOrigin,
                    transform: `scale(${zoom.scale})`,
                  }}
                >
                  <div ref={pdfContainer}>
                    <ArtBoard />
                  </div>
                </div>
              </div>
            </div>
            <ResizeBar wrapCVRef={wrapCVRef} zoom={zoom} setZoom={setZoom} />
          </div>
          <div className={styles.right}>
            <RightSidebar pdf={pdfContainer} />
          </div>
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, zoom]);
};

export default Builder;

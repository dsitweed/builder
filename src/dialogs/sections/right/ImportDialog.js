import BaseDialog from "../../BaseDialog";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { useResumeDispatch } from "../../../contexts/ResumeContext";
import { CV_ID, FRONTEND_URL, JWT } from "../../../constants/CommonConstants";
import React, { memo, useEffect, useState } from "react";
import { useAccuracyDispatch } from "../../../contexts/AccuracyContext";
import { AccuracyEvent, ResumeEvent } from "../../../constants/ContextEvent";
import { ToastError, ToastSuccess } from "../../../components/CustomToast";
import {
  importData,
  getDetailSourceData,
  getListDataSources,
} from "../../../api/request/data";
import { List, ListItem, ListItemText, Box } from "@material-ui/core";
import { GetItem } from "../../../services/clientStorage";

const ImportDialog = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const dispatch = useResumeDispatch();
  const accuracyDispatch = useAccuracyDispatch();

  useEffect(() => {
    if (open) {
      (async () => {
        const data_source = await getListDataSources(GetItem(JWT));
        if (data_source.status) {
          setData(data_source.data);
        }
      })();
    }
  }, [open]);

  const importDataSources = async (sourceId) => {
    let res = await importData(GetItem(CV_ID), sourceId, GetItem(JWT));
    if (res.status) {
      let data = res.data;
      data = { ...data, source_id: sourceId };
      dispatch({ type: ResumeEvent.INIT_DATA, payload: data });
      ToastSuccess(t("importSuccess"));
    } else ToastError(res.data);
    res = await getDetailSourceData(sourceId, GetItem(JWT));
    if (res.status) {
      accuracyDispatch({
        type: AccuracyEvent.INIT_ACCURACY,
        payload: res.data.struct,
      });
    } else ToastError(res.data);
  };

  const navigateImportSource = () => {
    window.location.replace(
      `${FRONTEND_URL}/settings/data-source`
    );
  };

  return (
    <BaseDialog hideActions state={[open, setOpen]} title={t("importHeading")}>
      <p className="leading-loose">{t("importText")}</p>
      <Box
        width="100%"
        border="0.5px solid rgba(65, 69, 97, 0.2)"
        borderRadius="5px"
        mt={2}
      >
        <List disablePadding={true}>
          {data?.map((element, index) => (
            <ListItem
              divider
              button
              style={{
                minHeight: 64,
                borderTopRightRadius: "5px",
                borderTopLeftRadius: "5px",
              }}
              alignItems="flex-start"
              onClick={() => importDataSources(element.sourceId)}
            >
              <img src={element.thumbnailUrl} alt="avatar" />
              <ListItemText>{element.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "16px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigateImportSource()}
        >
          {t("importButton")}
        </Button>
      </Box>
    </BaseDialog>
  );
};

export default memo(ImportDialog);

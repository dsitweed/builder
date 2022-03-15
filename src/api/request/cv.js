import { ToastError } from "../../components/CustomToast";
import client from "../request";

export const updateCvTemplate = async (cvId, templateId, auth) => {
  const res = await client.put(
    `cv/template`,
    {
      cv_id: cvId,
      templateId: templateId,
    },
    auth
  );
  return res;
};

export const getCV = async (cvId, auth) => {
  const res = await client.get(`cv/${cvId}`, auth);
  if (!res.status) return res;
  return res;
};

export const updateCV = async (cvId, body, auth) => {
  body["cv_id"] = cvId;//Co the chay dc hay ko ??
  const res = await client.put("cv", body, auth);
  if (!res.status) {  
    ToastError(res.data);
    return null;
  }
  return true;
};

export const updateSettingCV = async (cvId, body, auth) => {
  body["cv_id"] = cvId;
  const res = await client.put("cv/setting", body, auth);
  return res;
};

export const getSharedCode = async (cvId, auth, isShow = true) => {
  const res = await client.get(`cv/share/${cvId}?show_verify=${isShow}`, auth);
  return res;
};

//Ko hieu lam minh se truyen sharedCode la minh se truyen cai gi
export const getSharedData = async (cvId, sharedCode) => {
  const res = await client.get(`cv/get/${cvId}?share_code=${sharedCode}`);
  return res;
};

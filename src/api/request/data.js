import client from "../request";

export const importData = async (cvId, sourceId, auth) => {
  const res = await client.get(`data/import/${sourceId}?cvId=${cvId}`, auth);
  if (!res.status) return res;
  return {
    status: true,
    data: res.data,
  };
};

export const getDetailSourceData = async (sourceId, auth) => {
  const res = await client.get(`data/import/${sourceId}`, auth);
  if (!res.status) return res;
  return {
    status: true,
    data: res.data,
  };
};

export const getListDataSources = async (auth) => {
  const res = await client.get(`user/source`, auth);
  if (!res.status) return res;
  return {
    status: true,
    data: res.data.registeredSources,
  };
};

import client from "../request";

export const ExportSinglePdf = async (cvId, auth) => {
  const res = await client.get(`chromium/export-pdf/single?cvId=${cvId}`, auth);
  return res;
};

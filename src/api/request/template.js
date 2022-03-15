import client from "../request";

export const getTemplate = async (templateId, auth) => {
  const res = await client.get(`template/${templateId}`, auth);
  if (!res.status) return res;
  const resume = res.data;
  resume["resumeName"] = "Civizen";
  resume["options"]["language"] = "vi";
  return {
    status: true,
    data: resume,
  };
};

export const getListTemplates = async (auth) => {
  const res = await client.get(`template/get`, auth);
  if (!res.status) return res;
  const templates = res.data.templates;
  return {
    status: true,
    data: templates,
  };
};

import client from "../request";

export const getUserProfile = async (auth) => {
  const res = await client.get(`user/profile`, auth);
  if (!res.status) return res;
  const User = res.data;
  return {
    status: true,
    data: User,
  };
};

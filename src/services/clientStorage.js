export const GetItem = (key, type = "local") => {
  let result = "";
  if (type === "local") result = localStorage.getItem(key);
  else result = sessionStorage.getItem(key);
  if (result === "null") return undefined;
  return result;
};

export const SetItem = (key, value, type = "local") => {
  if (type === "local") localStorage.setItem(key, value);
  else sessionStorage.setItem(key, value);
};

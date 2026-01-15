import API from "./api";

export const createUser = async (user) => {
  try {
    const res = await API.post("auth/register", user);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to signin");
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const res = await API.post("auth/login", { email, password });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

export const logoutUser = async () => {
  const res = await API.get("auth/logout");

  return res;
};

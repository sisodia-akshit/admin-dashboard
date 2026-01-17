import API from "./api";

export const getDashboardStats = async ({ signal }) => {
  try {
    const res = await API.get("dashboard", {
      signal,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
};

export const getAdminStats = async ({ signal }) => {
  try {
    const res = await API.get("dashboard/admin", {
      signal,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
};
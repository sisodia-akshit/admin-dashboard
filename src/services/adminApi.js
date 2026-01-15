import API from "./api";

export const getAdminStats = async ({ signal }) => {
  try {
    const res = await API.get("/admin", {
      signal,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
};

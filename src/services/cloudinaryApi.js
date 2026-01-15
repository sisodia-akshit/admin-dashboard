import API from "./api";

export const getCloudSignature = async ({ signal }) => {
  try {
    const res = await API.get("cloudinary/signature", {
      signal,
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
};

import API from "./api";

export const createUser = async (data) => {
  try {
    const res = await API.post("auth/register", data);
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
export const getUser = async () => {
  try {
    const res = await API.get("auth/me");

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to logout");
  }
};
export const logoutUser = async () => {
  try {
    const res = await API.get("auth/logout");

    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to logout");
  }
};
export const generateOtp = async (data) => {
  try {
    const res = await API.post("auth/generate_otp", data);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong.Please try again later...");
  }
};
export const verifyOtp = async (user) => {
  try {
    const res = await API.post("auth/verify", user);

    return res;
  } catch (error) {
    console.log(error.response)
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong. Please try again later..."
    );
  }
};

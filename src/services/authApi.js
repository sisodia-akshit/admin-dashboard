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
export const forgetPassword = async ({ email }) => {
  try {
    const res = await API.post("auth/forget-password", { email });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};
export const resetPassword = async ({ token, password }) => {
  try {
    const res = await API.post(`auth/reset-password/${token}`, { password });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to login");
  }
};

export const logoutUser = async () => {
  const res = await API.post("auth/logout");
  return res;
};
export const generateOtp = async (data) => {
  try {
    const res = await API.post("auth/generate_otp", data);
    return res.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong.Please try again later...",
    );
  }
};
export const verifyOtp = async (user) => {
  try {
    const res = await API.post("auth/verify", user);

    return res;
  } catch (error) {
    console.log(error.response);
    throw new Error(
      error.response?.data?.message ||
        "Something went wrong. Please try again later...",
    );
  }
};

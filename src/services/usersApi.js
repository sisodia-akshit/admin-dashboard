import API from "./api";

export const getUser = async () => {
  try {
    const res = await API.get("users/me");

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to logout");
  }
};
export const getUsers = async ({
  search,
  page,
  limit,
  sort,
  order,
  signal,
}) => {
  const params = new URLSearchParams({
    page: page,
    limit: limit,
    sort: sort,
    order: order,
    ...(search && { search: search }),
  });
  try {
    const res = await API.get(`users`, {
      params,
      signal,
    });
    return { data: res.data.data, total: res.data.total };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
};
export const setUserRole = async ({ id, role, signal }) => {
  try {
    const res = await API.patch(`users/change_role/${id}`, {
      role,
      signal,
    });
    return res;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong!!");
  }
};

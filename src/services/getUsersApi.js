import API from "./api";

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
    ...(search && { email: search }),
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

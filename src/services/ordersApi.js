import API from "./api";

export const getOrders = async ({
  status,
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
    ...(status !== "all" && { status }),
  });
  try {
    const res = await API.get(`orders`, {
      params,
      signal,
    });

    return { data: res.data.data, total: Number(res.data.total) };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch");
  }
};

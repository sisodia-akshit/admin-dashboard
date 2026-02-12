import API from "./api";

export const getAllOrders = async ({
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
  const res = await API.get(`orders/all`, {
    params,
    signal,
  });

  return res.data ?? [];
};

export const getOrders = async ({ signal }) => {
  const res = await API.get(`orders`, { signal });
  return res.data;
};

export const updateOrderStatus = async ({ id, status }) => {
  const res = await API.patch(`orders/${id}`, { status });
  return res.data;
};

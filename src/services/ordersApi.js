export const getOrders = async ({ status, page, limit, sort, order }) => {
  const params = new URLSearchParams({
    _page: page,
    _limit: limit,
    _sort: sort,
    _order: order,
    ...(status !== "all" && { status }),
  });

  const res = await fetch(`http://localhost:3001/orders?${params}`);

  if (!res.ok) throw new Error("Failed to fetch orders");

  const total = res.headers.get("X-Total-Count");
  const data = await res.json();

  return { data, total: Number(total) };
};

export const getUsers = async ({
  search,
  page,
  limit,
  sort,
  order,
  signal,
}) => {
  const params = new URLSearchParams({
    _page: page,
    _limit: limit,
    _sort: sort,
    _order: order,
    ...(search && { name_like: search }),
  });

  const res = await fetch(`http://localhost:3001/users?${params}`, { signal });

  if (!res.ok) throw new Error("Failed to fetch users");

  const total = res.headers.get("X-Total-Count");
  const data = await res.json();

  return { data, total: Number(total) };
};

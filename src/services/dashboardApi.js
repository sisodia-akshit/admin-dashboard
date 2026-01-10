export const getDashboardStats = async ({ signal }) => {
  const [usersRes, ordersRes] = await Promise.all([
    fetch("http://localhost:3001/users", { signal }),
    fetch("http://localhost:3001/orders", { signal }),
  ]);

  if (!usersRes.ok || !ordersRes.ok) {
    throw new Error("Failed to load dashboard stats");
  }

  const users = await usersRes.json();
  const orders = await ordersRes.json();

  const pendingOrders = orders.filter(
    (o) => o.status === "pending"
  ).length;

  return {
    totalUsers: users.length,
    totalOrders: orders.length,
    pendingOrders,
    revenue: orders.reduce(
      (sum, o) => sum + (o.amount || 0),
      0
    ),
  };
};

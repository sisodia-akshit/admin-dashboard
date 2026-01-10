export const createUser = async (user) => {
  const res = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!res.ok) throw new Error("Failed to create user");

  return res.json();
};
export const loginUser = async ({ email, password }) => {
  const res = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({email, password}),
  });

  const users = await res.json();

  if (users.length === 0) {
    throw new Error("Invalid email or password");
  }

  if (!res.ok) throw new Error("Failed to login");

  return users[0];
};

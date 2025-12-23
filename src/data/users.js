const users = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@mail.com`,
  status: i % 2 === 0 ? "Active" : "Blocked",
}));

export default users;

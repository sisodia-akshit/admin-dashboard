import { useState } from "react";
import Layout from "../components/Layout";
import usersData from "../data/users";

const Users = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const usersPerPage = 5;

  const filteredUsers = usersData.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    start,
    start + usersPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <Layout>
      <h1>Users</h1>

      <input
        placeholder="Search user"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        style={{ marginBottom: "10px", padding: "8px" }}
      />

      <div style={{ overflowX: "auto" }}>
        <table width="100%" border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "10px" }}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              marginRight: "5px",
              fontWeight: page === i + 1 ? "bold" : "normal",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </Layout>
  );
};

export default Users;

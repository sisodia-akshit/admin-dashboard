import Layout from "../components/Layout";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import SearchInput from "../components/SearchInput";
import useDebounce from "../hooks/useDebounce";
import useQueryParams from "../hooks/useQueryParams";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { getUsers } from "../services/usersApi";
import ChangeRoleModel from "../components/ChangeRoleModel";



const Users = () => {
  const { user } = useAuth();
  const [updatingUser, setUpdatingUser] = useState(null);


  const { getParam, setParams } = useQueryParams();

  const page = Number(getParam("page", 1));
  const search = getParam("search", "");
  const sort = getParam("sort", "");
  const order = getParam("order", "");

  const usersPerPage = 5;

  const debounceSearch = useDebounce(search, 500);

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "users",
      page,
      debounceSearch,
      sort,
      order,
    ],
    queryFn: ({ signal }) =>
      getUsers({
        page,
        limit: usersPerPage,
        search: debounceSearch,
        sort,
        order,
        signal,
      }),
    keepPreviousData: true,
  });

  const users = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / usersPerPage);

  if (!user) if (!user) return <p className='container'>loading...</p>
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setParams({ page: 1 });
    }
  }, [page, totalPages, setParams]);

  // -------- HANDLERS --------
  const onSearchChange = (e) => {
    setParams({
      search: e.target.value,
      page: 1,
    });
  };
  const onPageChange = (p) => {
    setParams({
      page: p
    });
  };

  const onSort = (config) => {
    setParams({
      sort: config?.key || "",
      order: config?.direction || "",
      page: 1,
    })
  };

  if (user.role !== "admin") {
    return (
      <Layout>
        <p>You are not authorized to view users.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Users</h1>

      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {/* to change Role  */}
      {updatingUser && <ChangeRoleModel
        updateUser={updatingUser}
        onClose={() => setUpdatingUser(null)}
      />}

      <SearchInput
        placeholder={"Search user by email"}
        value={search}
        onChange={onSearchChange}
        style={{ marginBottom: "10px", padding: "8px" }}
      />

      {/* non-blocking loading indicator */}
      <div style={{ minHeight: "18px" }}>
        {isLoading && <small>Loading results...</small>}
      </div>

      <DataTable
        columns={[
          { label: "ID", key: "id" },
          { label: "Name", key: "name" },
          { label: "Email", key: "email" },
          { label: "Role", key: "role" },
          { label: "Action", key: null },
        ]}
        data={users}
        sortConfig={
          sort
            ? { key: sort, direction: order }
            : null
        }
        onSort={onSort}
        renderRow={(u) => (
          <tr key={u._id}>
            <td>{u._id}</td>
            <td>{u.name}</td>
            <td>{u.email || "N/A"}</td>
            <td>{u.role}</td>
            <td>{(user.role === "admin") && <><button onClick={() => setUpdatingUser(u)}>
              Change Role
            </button>&nbsp;</>}</td>
          </tr>
        )}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        // onPageChange={onPageChange}
        onPageChange={onPageChange}
      />
    </Layout>
  );
};

export default Users;

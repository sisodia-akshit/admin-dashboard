import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DataTable from "../components/DataTable";
import Pagination from "../components/Pagination";
import SearchInput from "../components/SearchInput";
import useDebounce from "../hooks/useDebounce";
import useQueryParams from "../hooks/useQueryParams";
import { useQuery } from "@tanstack/react-query";
import { getBooks, getMyBooks } from "../services/booksApi";
//CRUD book
import CreateBookModal from "../components/CreateBookModal";
import EditBookModal from "../components/EditBookModal";
import DeleteBookModal from "../components/DeleteBookModal";
//Admin Check
import { useAuth } from "../context/AuthContext";

const Books = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";
    const [isMyBooks, setMyBooks] = useState(true);
    // CRUD 
    const [open, setOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [deletingBook, setDeletingBook] = useState(null);
    // get Params
    const { getParam, setParams } = useQueryParams();

    const page = Number(getParam("page", 1));
    const search = getParam("search", "");
    const sort = getParam("sort", "");
    const order = getParam("order", "");

    const booksPerPage = 5;

    const debouncedSearch = useDebounce(search, 500);

    const { data, isLoading, error } = useQuery({
        queryKey: ["books", page, debouncedSearch, sort, order, isMyBooks],
        queryFn: ({ signal }) =>
            isMyBooks ? getMyBooks({
                page,
                limit: booksPerPage,
                search: debouncedSearch,
                sort,
                order,
                signal,
            }) : getBooks({
                page,
                limit: booksPerPage,
                search: debouncedSearch,
                sort,
                order,
                signal,
            }),
        keepPreviousData: true,
    });

    const books = data?.data ?? [];
    const total = data?.totalBooks ?? 0;
    const totalPages = Math.ceil(total / booksPerPage);

    useEffect(() => {
        setParams({ page: 1 });
    }, [isMyBooks]);

    if (!user) if (!user) return <p className='container'>loading...</p>

    return (
        <Layout>
            <h1>Books</h1>

            {error && <p style={{ color: "red" }}>{error.message}</p>}

            <SearchInput
                placeholder="Search books"
                value={search}
                onChange={(e) =>
                    setParams({ search: e.target.value, page: 1 })
                }
            />

            <div style={{ minHeight: 18 }}>
                {isLoading && <small>Loading books…</small>}
            </div>

            {/* add book btn */}

            <button onClick={() => setOpen(true)}>
                + Add Book
            </button>
            <br /><br />


            {/* CRUD book model */}
            {open && (
                <CreateBookModal onClose={() => setOpen(false)} />
            )}

            {editingBook && (
                <EditBookModal
                    book={editingBook}
                    onClose={() => setEditingBook(null)}
                />
            )}

            {deletingBook && (
                <DeleteBookModal
                    book={deletingBook}
                    onClose={() => setDeletingBook(null)}
                />
            )}

            <div style={{ marginBottom: "10px" }}>
                <button onClick={() => setMyBooks(false)} disabled={!isMyBooks} style={!isMyBooks ? {} : { background: "#ccc" }}>
                    All Books
                </button>

                <button onClick={() => setMyBooks(true)} disabled={isMyBooks} style={isMyBooks ? { marginLeft: "6px" } : { background: "#ccc", marginLeft: "6px" }} >
                    My Books
                </button>
            </div>
            <h2>Books Data</h2>

            <DataTable
                columns={[
                    // { label: "ID", key: "id" },
                    { label: "Title", key: "title" },
                    { label: "Author", key: "author" },
                    { label: "Price", key: "price" },
                    { label: "Stock", key: "stock" },
                    { label: "Category", key: "category" },
                    // { label: "Ratings", key: "ratings" },
                    // { label: "Genre", key: "genre" },
                    { label: "Action", key: null },
                ]}
                data={books}
                sortConfig={sort ? { key: sort, direction: order } : null}
                onSort={(config) =>
                    setParams({
                        sort: config?.key || "",
                        order: config?.direction || "",
                        page: 1,
                    })
                }
                renderRow={(b, i) => (
                    <tr key={b._id}>
                        {/* <td>{b._id}</td> */}
                        <td>{b.title}</td>
                        <td>{b.author}</td>
                        <td>₹{b.price}</td>
                        <td>{b.stock}</td>
                        <td>{b.category}</td>
                        {/* <td>{b.ratings}</td> */}
                        {/* <td>{b.genres.map((g, i) => {
                            return <span key={i}>{g}, </span>
                        })}</td> */}
                        <td>
                            <div style={{ display: "flex" }}>
                                {(isAdmin || b.createdBy === user._id) && <><button onClick={() => setEditingBook(b)}>
                                    Edit
                                </button>&nbsp;</>}
                                {(!isAdmin && b.createdBy !== user._id) && <span>Admin only</span>}
                                {isAdmin && <button
                                    onClick={() => setDeletingBook(b)}
                                    style={{ marginLeft: "6px", backgroundColor: "red" }}
                                >
                                    Delete
                                </button>}
                            </div>

                        </td>
                    </tr>
                )}
            />

            <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(p) => setParams({ page: p })}
            />
        </Layout>
    );
};

export default Books;

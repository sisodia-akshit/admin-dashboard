import { alpha, Box, Button, Pagination, Stack, TableCell, TableRow, Typography } from "@mui/material"
import UsersIcon from "@mui/icons-material/People";
import { useUsers } from "../../hooks/useUsers";
import Loading from "../ui/Loading";
import useQueryParams from "../../hooks/useQueryParams";
import useDebounce from "../../hooks/useDebounce";
import { useEffect } from "react";
import DataTable from "../layout/DataTable";
import SearchInput from "../filters/SearchInput";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";




function CardUsers() {

    const { getParam, setParams } = useQueryParams();

    const page = Number(getParam("page", 1));
    const search = getParam("search", "");
    const sort = getParam("sort", "");
    const order = getParam("order", "");

    const limit = 10;

    const debounceSearch = useDebounce(search, 500);

    const { data, isLoading, error } = useUsers({ limit, page, search: debounceSearch, sort, order });
    const users = data?.data ?? [];
    const total = data?.total ?? 0;
    const totalPages = Math.ceil(total / limit);

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
    const onPageChangeHandler = (p) => {
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

    if (error) console.log(error)
    return (
        <Box
            sx={{
                borderRadius: 2,
                backgroundColor: "background.paper",
                color: "text.primary",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
            }}
        >
            {/* Header */}
            <Box sx={{ p: 2, fontWeight: "600", display: "flex", justifyContent: "space-between" }}>
                Users
                <Box>
                    <SearchInput
                        placeholder={"Search"}
                        value={search}
                        onChange={onSearchChange}
                    />
                </Box>
            </Box>

            {/* Body - THIS grows */}
            {isLoading ? <Loading /> : <Box
                sx={{
                    flexGrow: 1,
                    overflow: "auto", // important for long content
                    p: 2,
                    minHeight: "400px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // justifyContent: "center",
                }}
            >
                {/* recent list goes here */}

                {users.length > 0 ?
                    <>
                        <DataTable
                            columns={[
                                // { label: "ID", key: "id" },
                                // { label: "Payment", key: "payment" },
                                { label: "Profile", key: "image" },
                                { label: "Name", key: "name" },
                                // { label: "Order Date", key: "createdAt" },
                                { label: "Email", key: "email" },
                                { label: "Role", key: "role" },
                                { label: "Action", key: null },
                                { label: "Status", key: "isActive" },
                            ]}
                            data={users}
                            sortConfig={
                                sort
                                    ? { key: sort, direction: order }
                                    : null
                            }
                            onSort={onSort}
                            renderRow={(u, i) => (
                                <TableRow key={i}>
                                    {/* <td>{u._id}</td> */}
                                    {/* <td>{u.paymentStatus}</td> */}
                                    <TableCell sx={{ py: 2, border: 0, color: "#777" }} >
                                        <Box

                                            component="img"
                                            src={u?.photo ?? "https://res.cloudinary.com/dgpznnv1r/image/upload/v1768841024/books/fzyjghqjqyrztxhlzya9.webp"}
                                            alt="photo"
                                            sx={{
                                                minWidth: 50,
                                                height: 50,
                                                objectFit: "contain",
                                                borderRadius: 2,
                                                border: "1px solid #ccc"

                                            }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ py: 2, border: 0, color: "#777" }} >{u.name}</TableCell>
                                    {/* <TableCell sx={{ py: 2, border: 0, color: "#777" }} >{changDateFormate(u.createdAt)}</TableCell> */}
                                    <TableCell sx={{ py: 2, border: 0, color: "#777" }} >{u.email}</TableCell>
                                    <TableCell sx={{ py: 2, border: 0, color: "#777" }} >{u.role}</TableCell>
                                    <TableCell sx={{ py: 2, border: 0, color: "#777" }} >
                                        <Button
                                            onClick={() => setSelectedOrder(o)}
                                            sx={{
                                                bgcolor: "background.default",
                                                padding: "0 10px",
                                                color: "color.main"
                                            }}
                                        >
                                            Edit <KeyboardArrowDownIcon />
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={{ py: 2, border: 0 }} >
                                        {u.isActive && <Button sx={{
                                            p: "0 10px",
                                            color: (theme) =>
                                                alpha(theme.palette.success.main, 0.8),
                                            bgcolor: (theme) =>
                                                alpha(theme.palette.success.main, 0.15),
                                            fontSize: 13,
                                            textTransform: "capitalize"
                                        }}>Active</Button>}
                                        {!u.isActive && <Button sx={{
                                            p: "0 10px",
                                            color: (theme) =>
                                                alpha(theme.palette.error.main, 0.8),
                                            bgcolor: (theme) =>
                                                alpha(theme.palette.error.main, 0.15),
                                            fontSize: 13,
                                            textTransform: "capitalize"
                                        }}>In-Active</Button>}
                                    </TableCell>
                                </TableRow>
                            )} />

                        <Stack alignItems="center" sx={{ mt: 2 }}>
                            <Pagination
                                page={page}
                                count={totalPages}
                                onChange={(_, value) => onPageChangeHandler(value)}
                                color="primary"
                                shape="rounded"
                            />
                        </Stack>
                    </> :
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <UsersIcon sx={{
                            width: 150,
                            height: 150,
                            p: 6,
                            backgroundColor: "background.default",
                            border: "1px solid #ccc",
                            borderRadius: "50%",
                        }} />


                        <Typography variant="h6" fontWeight={600} mt={4}>
                            No User Found!
                        </Typography>

                    </Box>}

            </Box>}
        </Box>
    )
}

export default CardUsers
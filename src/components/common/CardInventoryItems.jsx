import {
    Avatar, Box, Button, Typography,
    TableCell,
    TableRow,
    Pagination,
    Stack,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import BookstoreLogo from "../../assets/BookstoreLogo4.png";
import AddIcon from "@mui/icons-material/Add";

import { useState } from 'react'
import useQueryParams from '../../hooks/useQueryParams';
import { useInventory } from '../../hooks/useInventory';
import Loading from '../ui/Loading';

import DataTable from "../layout/DataTable";
import Filter from "../filters/Filter";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchInput from "../filters/SearchInput";
import EditBookModal from "../models/EditBookModal";
import { useAuth } from "../../context/AuthContext";
import DeleteBookModal from "../models/DeleteBookModal";
// import TuneIcon from "@mui/icons-material/Tune";
// import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
// import CrossIcon from "@mui/icons-material/Cancel";

function CardInventoryItems() {
    const { user } = useAuth();
    const { getParam, setParams } = useQueryParams();

    // const [isFilter, setIsFilter] = useState(false);

    const page = Number(getParam("page") || 1);
    const search = getParam("search") || "";
    const sort = getParam("sort") || "";
    const order = getParam("order") || "";

    const [selectedItem, setSelectedItem] = useState(null);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const limit = 10;

    const { data, isLoading, error } = useInventory({ page, limit, search, sort, order });
    const books = data?.data ?? [];
    const total = data?.totalBooks ?? 0;
    const totalPages = Math.ceil(total / limit);

    const onSort = (config) => {
        setParams({
            sort: config?.key || "",
            order: config?.direction || "",
            page: 1,
        });
    };
    // const onFilterChange = (e) => {
    //     setParams({
    //         status: orderStatus,
    //         page: 1,
    //     });
    //     setIsFilter(false)
    // };
    const onPageChangeHandler = (p) => {
        setParams({
            page: p
        });
    };
    const onSearchChange = (e) => {
        setParams({
            search: e.target.value,
            page: 1,
        });
    };

    const editBookHandler = (item) => {
        setSelectedItem(item)
        setOpen(true)
    }
    const deleteBookHandler = (item) => {
        setSelectedItem(item)
        setOpenDelete(true)
    }
    const onClose = () => {
        setOpen(false)
    }
    const onCloseDelete = () => {
        setOpenDelete(false)
    }


    return (
        <Box
            sx={{

                borderRadius: 2,
                backgroundColor: "background.paper",
                color: "text.primary",
                display: "flex",
                flexDirection: "column",
                minHeight: "500px",
                height: "100%",
                width: "100%",
                overflow: "auto"
            }}
        >
            {open && <EditBookModal open={open} onClose={onClose} book={selectedItem} />}
            {openDelete && <DeleteBookModal open={openDelete} onClose={onCloseDelete} book={selectedItem} />}

            {/* Header */}
            <Box sx={{
                px: 2, py: 3,
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Typography fontWeight={600}>
                    Inventory Items
                </Typography>
                <Box sx={{
                    position: "relative",
                    display: "flex",
                    gap: 1,
                }}>
                    {/* filter  */}
                    <Box>
                        <SearchInput
                            placeholder={"Search"}
                            value={search}
                            onChange={onSearchChange}
                        />
                    </Box>
                    {/* <Box >
                        <Button variant="outlined" color="#000" sx={{ fontSize: 12 }} onClick={e => setIsFilter(true)}>
                            <FilterAltOutlinedIcon fontSize="small" />Filter
                        </Button>
                        {isFilter && <Box sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            bgcolor: "background.paper",
                            p: 1,
                            boxShadow: "0 0 5px #0002",
                            zIndex: 100,
                            borderRadius: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                        }}>
                            <CrossIcon fontSize="small" sx={{ position: "absolute", right: "10px" }} onClick={e => setIsFilter(false)} />
                            <Typography fontWeight={600}>Filter</Typography>
                            <Typography color="color.main" fontSize={13}>Order Status</Typography>
                            <Filter
                                value={orderStatus}
                                options={["all", "pending", "confirmed", "shipped", "delivered", "cancelled"]}
                                onChange={e => setOrderStatus(e.target.value)}
                            />
                            <Button variant="contained" fullWidth sx={{ borderRadius: 2 }} onClick={onFilterChange}>Filter</Button>
                        </Box>}
                    </Box> */}
                    {/* <Box >
                        <Button variant="outlined" color="#000" sx={{ fontSize: 12 }}>
                            This Week<KeyboardArrowDownIcon fontSize="small" />
                        </Button>
                    </Box> */}
                </Box>
            </Box>

            {/* Body - THIS grows */}
            {isLoading ?
                <Loading />
                :
                <Box
                    sx={{
                        width: "100%",
                        flexGrow: 1,
                        overflow: "auto", // important for long content
                        px: 2,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        // justifyContent: "center"
                    }}
                >
                    {/* recent list goes here */}

                    {books.length > 0 ?
                        <>
                            <DataTable
                                columns={[
                                    // { label: "ID", key: "id" },
                                    // { label: "Payment", key: "payment" },
                                    { label: "Book Name", key: "title" },
                                    { label: "Category", key: "category" },
                                    { label: "Price", key: "price" },
                                    { label: "Stock", key: "stock" },
                                    // { label: "Discount", key: "discount" },

                                    { label: "Action", key: null },
                                    { label: "Status", key: "orderStatus" },
                                ]}
                                data={books}
                                sortConfig={
                                    sort
                                        ? { key: sort, direction: order }
                                        : null
                                }
                                onSort={onSort}
                                renderRow={(curr, i) => (
                                    <TableRow key={i}>
                                        {/* <td>{curr._id}</td> */}
                                        {/* <td>{curr.paymentStatus}</td> */}
                                        <TableCell sx={{ py: 2, border: 0, color: "#777", textTransform: "capitalize" }} >{curr.title}</TableCell>
                                        <TableCell sx={{ py: 2, border: 0, color: "#777", textTransform: "capitalize" }} >{curr.category}</TableCell>
                                        <TableCell sx={{ py: 2, border: 0, color: "#777", textTransform: "capitalize" }} >₹{curr.price}</TableCell>
                                        <TableCell sx={{ py: 2, border: 0, color: "#777", textTransform: "capitalize" }} >{curr.stock}</TableCell>
                                        {/* <TableCell sx={{ py: 2, border: 0, color: "#777", textTransform:"capitalize" }} >{curr.discount}</TableCell> */}

                                        <TableCell sx={{ py: 2, border: 0, color: "#777", }} >
                                            <Button
                                                onClick={() => editBookHandler(curr)}
                                                sx={{
                                                    bgcolor: "background.default",
                                                    padding: "0 10px",
                                                    mr: 1
                                                }}
                                            >
                                                Edit
                                            </Button>

                                            {user.role === "admin" &&
                                                <Button
                                                    onClick={() => deleteBookHandler(curr)}
                                                    sx={{
                                                        color: "color.hover",
                                                        bgcolor: (theme) =>
                                                            alpha(theme.palette.error.main, 0.8),
                                                        padding: "0 10px",
                                                        textTransform: "capitalize"
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            }
                                        </TableCell>
                                        <TableCell sx={{ py: 2, border: 0 }} >
                                            {curr.orderStatus === "pending" && <Button sx={{ p: "0 10px", color: "#000", bgcolor: "secondary.pending", fontSize: 13, textTransform: "capitalize" }}>{curr.orderStatus}</Button>}
                                            {curr.orderStatus === "confirmed" && <Button sx={{ p: "0 10px", color: "#000", bgcolor: "secondary.pending", fontSize: 13, textTransform: "capitalize" }}>{curr.orderStatus}</Button>}
                                            {curr.orderStatus === "shipped" && <Button sx={{ p: "0 10px", color: "primary.main", bgcolor: "primary.alpha", fontSize: 13, textTransform: "capitalize" }}>{curr.orderStatus}</Button>}
                                            {curr.stock > 0 && <Button sx={{
                                                p: "0 10px",
                                                color: (theme) =>
                                                    alpha(theme.palette.success.main, 0.8),
                                                bgcolor: (theme) =>
                                                    alpha(theme.palette.success.main, 0.15),
                                                fontSize: 13,
                                                textTransform: "capitalize"
                                            }}>Available</Button>}
                                            {curr.stock === 0 && <Button sx={{
                                                p: "0 10px",
                                                color: (theme) =>
                                                    alpha(theme.palette.error.main, 0.8),
                                                bgcolor: (theme) =>
                                                    alpha(theme.palette.error.main, 0.15),
                                                fontSize: 13,
                                                textTransform: "capitalize"
                                            }}>N/A</Button>}
                                        </TableCell>
                                    </TableRow>
                                )} />

                            {totalPages > 1 &&
                                <Stack alignItems="center" sx={{ mt: 2 }}>
                                    <Pagination
                                        page={page}
                                        count={totalPages}
                                        onChange={(_, value) => onPageChangeHandler(value)}
                                        color="primary"
                                        shape="rounded"
                                    />
                                </Stack>}
                        </> :

                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Avatar
                                src={BookstoreLogo}
                                alt="books"
                                sx={{
                                    width: 150,
                                    height: 150,
                                    p: 3,
                                    backgroundColor: "background.default",
                                    border: "1px solid #ccc"
                                }} />

                            <Typography variant="h6" fontWeight={600} mt={4}>
                                No Book Yet!
                            </Typography>
                            <Typography variant="h7" color="color.light" mt={2}>
                                Add product to your store and start
                            </Typography>
                            <Typography variant="h7" color="color.light" >
                                selling already!
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                    mt: 2,
                                    height: "50px"
                                }}
                            >
                                <AddIcon fontSize="small" />New Product
                            </Button>
                        </Box>}

                </Box>
            }
        </Box>
    );
}

export default CardInventoryItems
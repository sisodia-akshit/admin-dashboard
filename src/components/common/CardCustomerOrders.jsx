import {
    Avatar, Box, Button, Toolbar, Typography, Table,
    TableCell,
    TableRow,
    Pagination,
    Stack,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import BookstoreLogo from "../../assets/BookstoreLogo4.png";
import AddIcon from "@mui/icons-material/Add";
import { useOrders } from "../../hooks/useOrders";
import Loading from "../ui/Loading";
import useQueryParams from "../../hooks/useQueryParams";
import { useState } from "react";
import DataTable from "../layout/DataTable";
import Filter from "../filters/Filter";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
// import TuneIcon from "@mui/icons-material/Tune";
import CrossIcon from "@mui/icons-material/Cancel";



function CardCustomerOrders() {
    const { getParam, setParams } = useQueryParams();

    const [isFilter, setIsFilter] = useState(false);
    const [orderStatus, setOrderStatus] = useState("all");

    const page = Number(getParam("page") || 1);
    const status = getParam("status") || "all";
    const sort = getParam("sort") || "";
    const order = getParam("order") || "";

    const [selectedOrder, setSelectedOrder] = useState(null);
    const limit = 5;

    const { data, isLoading, error } = useOrders({ page, limit, status, sort, order });
    const orders = data?.data ?? [];
    const total = data?.total ?? 0;
    const totalPages = Math.ceil(total / limit);

    const onSort = (config) => {
        setParams({
            sort: config?.key || "",
            order: config?.direction || "",
            page: 1,
        });
    };
    const onFilterChange = (e) => {
        setParams({
            status: orderStatus,
            page: 1,
        });
        setIsFilter(false)
    };
    const onPageChangeHandler = (p) => {
        setParams({
            page: p
        });
    };

    const changDateFormate = (date) => {
        const d = new Date(date);
        const pad = (n) => String(n).padStart(2, "0");
        const hours = d.getHours() % 12 || 12;
        const ampm = d.getHours() >= 12 ? "PM" : "AM";
        return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}, ${pad(hours)}:${pad(d.getMinutes())} ${ampm}`;
    }

    if (isLoading) return <Loading />

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
            {/* Header */}
            <Box sx={{
                px: 2, py: 3,
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Typography fontWeight={600}>
                    Customer Orders
                </Typography>
                <Box sx={{
                    position: "relative",
                    display: "flex",
                    gap: 1,
                }}>
                    <Box >
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
                    </Box>
                    <Box >
                        <Button variant="outlined" color="#000" sx={{ fontSize: 12 }}>
                            This Week<KeyboardArrowDownIcon fontSize="small" />
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Body - THIS grows */}
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

                {orders.length > 0 ?
                    <>
                        <DataTable
                            columns={[
                                // { label: "ID", key: "id" },
                                // { label: "Payment", key: "payment" },
                                { label: "Customer Name", key: "name" },
                                { label: "Order Date", key: "createdAt" },
                                { label: "Payment", key: "paymentMethod" },
                                { label: "Tracking ID", key: "orderNumber" },
                                { label: "Order Total", key: "totalAmount" },
                                { label: "Action", key: null },
                                { label: "Status", key: "orderStatus" },
                            ]}
                            data={orders}
                            sortConfig={
                                sort
                                    ? { key: sort, direction: order }
                                    : null
                            }
                            onSort={onSort}
                            renderRow={(o, i) => (
                                <TableRow key={i}>
                                    {/* <td>{o._id}</td> */}
                                    {/* <td>{o.paymentStatus}</td> */}
                                    <TableCell sx={{ py: 2, border: 0, color: "#777" }} >{o.user?.name}</TableCell>
                                    <TableCell sx={{ py: 2, border: 0, color: "#777" }} >{changDateFormate(o.createdAt)}</TableCell>
                                    <TableCell sx={{ py: 2, border: 0, color: "#777" }} >{o.paymentMethod}</TableCell>
                                    <TableCell sx={{ py: 2, border: 0, color: "#777" }} >{o.orderNumber}</TableCell>
                                    <TableCell sx={{ py: 2, border: 0, color: "#777" }} >₹{o.totalAmount}</TableCell>
                                    <TableCell sx={{ py: 2, border: 0, color: "#777" }} >
                                        <Button
                                            onClick={() => setSelectedOrder(o)}
                                            sx={{
                                                bgcolor: "background.default",
                                                padding: "0 10px"
                                            }}
                                        >
                                            View <KeyboardArrowDownIcon />
                                        </Button>
                                    </TableCell>
                                    <TableCell sx={{ py: 2, border: 0 }} >
                                        {o.orderStatus === "pending" && <Button sx={{ p: "0 10px", color: "#000", bgcolor: "secondary.pending", fontSize: 13, textTransform: "capitalize" }}>{o.orderStatus}</Button>}
                                        {o.orderStatus === "confirmed" && <Button sx={{ p: "0 10px", color: "#000", bgcolor: "secondary.pending", fontSize: 13, textTransform: "capitalize" }}>{o.orderStatus}</Button>}
                                        {o.orderStatus === "shipped" && <Button sx={{ p: "0 10px", color: "primary.main", bgcolor: "primary.alpha", fontSize: 13, textTransform: "capitalize" }}>{o.orderStatus}</Button>}
                                        {o.orderStatus === "delivered" && <Button sx={{
                                            p: "0 10px",
                                            color: (theme) =>
                                                alpha(theme.palette.success.main, 0.8),
                                            bgcolor: (theme) =>
                                                alpha(theme.palette.success.main, 0.15),
                                            fontSize: 13,
                                            textTransform: "capitalize"
                                        }}>{o.orderStatus}</Button>}
                                        {o.orderStatus === "cancelled" && <Button sx={{
                                            p: "0 10px",
                                            color: (theme) =>
                                                alpha(theme.palette.error.main, 0.8),
                                            bgcolor: (theme) =>
                                                alpha(theme.palette.error.main, 0.15),
                                            fontSize: 13,
                                            textTransform: "capitalize"
                                        }}>{o.orderStatus}</Button>}
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
                            alt="orders"
                            sx={{
                                width: 150,
                                height: 150,
                                p: 3,
                                backgroundColor: "background.default",
                                border: "1px solid #ccc"
                            }} />

                        <Typography variant="h6" fontWeight={600} mt={4}>
                            No Orders Yet?
                        </Typography>
                        <Typography variant="h7" color="color.light" mt={2}>
                            Add product to your store and start
                        </Typography>
                        <Typography variant="h7" color="color.light" >
                            selling to see orders here.
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
        </Box>
    );
}

export default CardCustomerOrders;

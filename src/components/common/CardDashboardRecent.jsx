import {
    Avatar, Box, Button, Toolbar, Typography, Table,
    TableCell,
    TableRow,
    Divider,
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
import SortIcon from "@mui/icons-material/FilterList";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import CrossIcon from "@mui/icons-material/Cancel";



function CardDashboardRecent() {
    const { getParam, setParams } = useQueryParams();

    const [isFilter, setIsFilter] = useState(false);
    const [orderStatus, setOrderStatus] = useState("all");

    const page = Number(getParam("page") || 1);
    const status = getParam("status") || "all";
    const sort = getParam("sort") || "";
    const order = getParam("order") || "";

    const [selectedOrder, setSelectedOrder] = useState(null);
    const limit = 10

    const { data, isLoading, error } = useOrders({ page, limit, status, sort, order });
    const orders = data?.data ?? [];

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

    const changDateFormate = (date) => {
        const d = new Date(date);
        const pad = (n) => String(n).padStart(2, "0");
        const hours = d.getHours() % 12 || 12;
        const ampm = d.getHours() >= 12 ? "PM" : "AM";
        return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
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
                px: 2, py: 3, fontWeight: "500",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Typography fontWeight={600}>
                    Recent Orders
                </Typography>
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
                    orders.map((o, index) => {
                        return <Box key={index} sx={{ width: "100%" }}>
                            {o.items.map((i) => {
                                return (
                                    <Box sx={{ display: "flex", width: '100%', gap: 1, mt: 1, borderBottom: "1px solid #eee", pb: 1 }}>
                                        <Box

                                            component="img"
                                            src={i.coverImage}
                                            alt="product"
                                            sx={{
                                                minWidth: 50,
                                                height: 50,
                                                objectFit: "contain",
                                                borderRadius: 2,
                                                border: "1px solid #ccc"

                                            }}
                                        />
                                        <Box sx={{ display: "flex", flexDirection: "column", width: '100%' }}>
                                            <Typography variant="h7" sx={{ color: "color.main", textTransform: "capitalize" }}>
                                                {i.title}
                                            </Typography>
                                            <Typography variant="h7" sx={{ color: "text.primary", fontWeight: 500, textTransform: "capitalize" }}>
                                                ₹{i.price}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ minWidth: 70, display: "flex", flexDirection: "column",alignItems:"end",justifyContent:"space-between" }}>
                                            <Typography variant="h7" sx={{ color: "color.main", textTransform: "capitalize", fontSize: 11 }}>
                                                {changDateFormate(o.createdAt)}
                                            </Typography>

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
                                        </Box>
                                    </Box>
                                )
                            })}

                        </Box>
                    })
                    :

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

export default CardDashboardRecent;

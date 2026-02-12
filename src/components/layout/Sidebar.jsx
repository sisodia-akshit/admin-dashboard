import {
    Drawer,
    List,
    Toolbar,
    Box,
    Divider,
    useMediaQuery,
    Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import OrderIcon from "@mui/icons-material/ShoppingBag";
import LogoutIcon from "@mui/icons-material/Logout";
import SidebarItem from "./SidebarItem";
import { useAuth } from "../../context/AuthContext";

import BookstoreLogo from "../../assets/BookstoreLogo4.png";


const FULL_WIDTH = 250;
const COLLAPSED_WIDTH = 72;

function Sidebar({ mobileOpen, onMobileClose }) {
    const theme = useTheme();
    const { logout, user } = useAuth();

    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const isCollapsed = useMediaQuery(
        theme.breakpoints.between("md", "lg")
    );

    const drawerWidth = isCollapsed
        ? COLLAPSED_WIDTH
        : FULL_WIDTH;

    const drawerContent = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <Box
                sx={{
                    p: 1
                }}
            >
                <Avatar
                    src={BookstoreLogo}
                    alt="Logo"
                    sx={{ width: 60, height: 60 }}
                />
            </Box>


            <List>
                <SidebarItem
                    to="/"
                    icon={<DashboardIcon />}
                    label="Dashboard"
                    collapsed={isCollapsed}
                />
                {user.role === "admin" && <SidebarItem
                    to="/users"
                    icon={<PeopleIcon />}
                    label="Users"
                    collapsed={isCollapsed}
                />}
                <SidebarItem
                    to="/orders"
                    icon={<OrderIcon />}
                    label="Orders"
                    collapsed={isCollapsed}
                />
                <SidebarItem
                    to="/inventory"
                    icon={<InventoryIcon />}
                    label="Inventory"
                    collapsed={isCollapsed}
                />
            </List>

            <Box sx={{ flexGrow: 1 }} />
            <Divider />

            <List>
                <SidebarItem
                    icon={<LogoutIcon />}
                    label="Logout"
                    collapsed={isCollapsed}
                    danger
                    onClick={logout}
                />
            </List>
        </Box >
    );

    return (
        <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? mobileOpen : true}
            onClose={onMobileClose}
            ModalProps={{ keepMounted: true }}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    overflowX: "hidden",
                },
            }}
        >
            {drawerContent}
        </Drawer>
    );
}


export default Sidebar;

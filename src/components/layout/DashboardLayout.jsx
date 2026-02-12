import { Box, Toolbar, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useTheme } from "@mui/material/styles";

const FULL_WIDTH = 250;
const COLLAPSED_WIDTH = 72;

function DashboardLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isCollapsed = useMediaQuery(
        theme.breakpoints.between("md", "lg")
    );

    const drawerWidth = isCollapsed
        ? COLLAPSED_WIDTH
        : FULL_WIDTH;

    return (
        <Box sx={{ display: "flex" }}>
            <Topbar onMenuClick={() => setMobileOpen(true)} />

            <Sidebar
                mobileOpen={mobileOpen}
                onMobileClose={() => setMobileOpen(false)}
            />

            <Box component="main" sx={{
                flexGrow: 1,
                minHeight: "100vh",
                maxWidth: { md: `calc(100% - ${drawerWidth}px)` },
                width: "100%",
                display: "flex",
                flexDirection: "column",

            }}>
                <Toolbar />


                <Box sx={{
                    p: {
                        md: 3,
                        xs: 1
                    },
                    my: 2.5
                }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}

export default DashboardLayout;

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Avatar,
    Divider,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import BreadcrumbsBar from "./BreadcrumbsBar";
import { useAuth } from "../../context/AuthContext";

// const drawerWidth = 250;

const FULL_WIDTH = 250;
const COLLAPSED_WIDTH = 72;

function Topbar({ onMenuClick }) {
    const { user } = useAuth();
    const theme = useTheme();
    const isCollapsed = useMediaQuery(
        theme.breakpoints.between("md", "lg")
    );

    const drawerWidth = isCollapsed
        ? COLLAPSED_WIDTH
        : FULL_WIDTH;

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
                boxShadow: "0 0 5px #0002",
                bgcolor: "background.paper",
                color: "color.main"
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={onMenuClick}
                    sx={{ mr: 2, display: { md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h5" >
                    Dashboard
                </Typography>

                <Box sx={{ flexGrow: 1 }} />


                <Box>
                    <Avatar
                        alt="User"
                        src={user?.photo ?? "https://res.cloudinary.com/dgpznnv1r/image/upload/v1768841024/books/fzyjghqjqyrztxhlzya9.webp"} // later: user profile image URL
                        sx={{
                            width: 30,
                            height: 30,
                            cursor: "pointer",
                        }}
                    />
                </Box>


            </Toolbar>
            <Divider />
            <BreadcrumbsBar />
        </AppBar>
    );
}

export default Topbar;

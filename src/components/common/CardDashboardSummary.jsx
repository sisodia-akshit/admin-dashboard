import { Box } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


function CardDashboardSummary() {
    return (
        <Box sx={{
            borderRadius: 2,
            backgroundColor: "background.paper",
            color: "color.main",
            // "&:hover": {
            //     backgroundColor: "primary.main",
            //     color: "color.hover"
            // }

        }} >
            <Box display={"flex"} padding={"15px"}>
                <Box fontWeight={600}>
                    Summary
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box
                    sx={{ color: "inherit", opacity: 0.5, display: "flex", alignItems: "center" }}
                    fontSize={12} >
                    This Week
                    <KeyboardArrowDownIcon fontSize="small" />
                </Box>
            </Box>
            <Box
                sx={{
                    minHeight: "200px",
                    // minWidth: "300px",
                    // backgroundColor:"red"
                }}
            >

            </Box>
        </Box>
    )
}

export default CardDashboardSummary
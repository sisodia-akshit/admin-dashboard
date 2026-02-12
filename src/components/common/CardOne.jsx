import { alpha, Box } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


function CardOne({ Icon, label1, label2, value1, value2 }) {
    return (
        <Box sx={{
            borderRadius: 2,
            backgroundColor: "background.paper",
            color: "text.primary",
            "&:hover": {
                backgroundColor: "primary.main",
                color: "color.hover"
            }

        }} >
            <Box display={"flex"} padding={"15px"}>
                <Box
                    sx={{
                        padding: "6px 7px 1px 7px",
                        borderRadius: 2,
                        backgroundColor: (theme) => alpha(theme.palette.secondary.main, .2),
                    }}>
                    <Icon fontSize="small" />
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box
                    sx={{ color: "inherit", opacity: 0.5, display: "flex", alignItems: "center" }}
                    fontSize={12} >
                    This Week
                    <KeyboardArrowDownIcon fontSize="small" />
                </Box>
            </Box>
            <Box display={"flex"} padding={"15px"}>
                <Box
                    width={"100%"}
                >
                    <Box
                        sx={{ color: "inherit", opacity: 0.6, fontSize: 14 }}
                    >
                        {label1}
                    </Box>
                    <Box fontSize={20} fontWeight={600}>
                        {value1}
                    </Box>
                </Box>
                <Box
                    width={"100%"}
                >
                    <Box
                        sx={{ color: "inherit", opacity: 0.6, fontSize: 14 }}
                    >
                        {label2}
                    </Box>
                    <Box fontSize={20} fontWeight={600}>
                        {value2}
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default CardOne
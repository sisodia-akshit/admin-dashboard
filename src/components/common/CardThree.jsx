import { Box, Typography } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DotIcon from "@mui/icons-material/Circle";

function CardThree({ value1, value2, value3 }) {
    return (
        <Box sx={{
            borderRadius: 2,
            backgroundColor: "background.paper",
            color: "color.main",
            p: 2
        }} >
            <Box display={"flex"}>
                <Box fontWeight={600}>
                    Marketing
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box
                    sx={{ color: "inherit", opacity: 0.5, display: "flex", alignItems: "center", fontSize: 12 }}
                >
                    This Week
                    <KeyboardArrowDownIcon fontSize="small" />
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                width: "100%",
            }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    width: "100%"
                }}
                >
                    <DotIcon sx={{
                        width: "10px",
                        color: "primary.main"
                    }} />
                    <Typography fontSize={12} color="color.light">
                        Acquisition
                    </Typography>

                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    width: "100%"
                }}
                >
                    <DotIcon sx={{
                        width: "10px",
                        color: "primary.light"
                    }} />
                    <Typography fontSize={12} color="color.light">
                        Purchase
                    </Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    width: "100%"
                }}
                >
                    <DotIcon sx={{
                        width: "10px",
                        color: "secondary.main"

                    }} />
                    <Typography fontSize={12} color="color.light">
                        Retention
                    </Typography>
                </Box>

            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    m: "auto",
                    width: "230px",
                    height: "230px",
                }}
            >
                {/* donut  */}
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "background.default",
                    width: "85%",
                    height: "85%",
                    borderRadius: "50%"
                }}>
                    {/* color circlr  */}
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "primary.main",
                        width: "80%",
                        height: "80%",
                        borderRadius: "50%"
                    }}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            bgcolor: "background.default",
                            width: "75%",
                            height: "75%",
                            borderRadius: "50%"
                        }}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                bgcolor: "background.paper",
                                width: "70%",
                                height: "70%",
                                borderRadius: "50%"
                            }}></Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default CardThree
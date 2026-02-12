import { Box, Typography } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DotIcon from "@mui/icons-material/Circle";

function CardThree({ value1 = 55, value2 = 35, value3 = 15 }) {
    const total = value1 + value2 + value3;

    const p1 = (value1 / total) * 100;
    const p2 = (value2 / total) * 100;
    const p3 = (value3 / total) * 100;

    const gradient = `conic-gradient(
    #5570F1 0% ${p1}%,
    #FFCC91 ${p1}% ${p1 + p2}%,
    #a1aef1 ${p1 + p2}% 100%
  )`;

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
            {/* donut  */}
            <Box sx={{
                mt: 3,
                width: 210,
                height: 210,
                borderRadius: "50%",
                background: "#F4F5FA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto"
            }}>
                {/* color circlr  */}
                <Box sx={{
                    width: 170,
                    height: 170,
                    borderRadius: "50%",
                    background: gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
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
    )
}

export default CardThree
import { alpha, Box, Button, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const data = [
    { date: "Sept 10", value: 90000 },
    { date: "Sept 11", value: 40000 },
    { date: "Sept 12", value: 67000 },
    { date: "Sept 13", value: 25000 },
    { date: "Sept 14", value: 85000 },
    { date: "Sept 15", value: 48000 },
    { date: "Sept 16", value: 85000 }
];

const maxValue = 100000;

function CardDashboardSummary() {
    return (
        <Box
            sx={{
                borderRadius: 3,
                bgcolor: "background.paper",
                p: 2
            }}
        >
            {/* Header */}
            <Box display="flex" alignItems="center">
                <Typography fontWeight={600}>Summary</Typography>

                <Button
                    size="small"
                    sx={(theme) => ({
                        ml: 2,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        textTransform: "capitalize",
                        fontSize: 14,
                        borderRadius: 2,
                        boxShadow: "none"
                    })}
                >
                    Sales <KeyboardArrowDownIcon fontSize="small" />
                </Button>

                <Box sx={{ flexGrow: 1 }} />

                <Typography
                    sx={{ opacity: 0.6, display: "flex", alignItems: "center" }}
                    fontSize={13}
                >
                    Last 7 Days
                    <KeyboardArrowDownIcon fontSize="small" />
                </Typography>
            </Box>

            {/* Chart */}
            <Box
                sx={{
                    display: "flex",
                    mt: 4,
                    height: 220,
                    alignItems: "flex-end",
                    gap: 3
                }}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent:"start",
                    alignItems:"center",
                    pb:5,
                    gap:2.4
                }}>
                    <Typography sx={{fontSize:12, color:"color.light"}}>
                        100k
                    </Typography>
                    <Typography sx={{fontSize:12, color:"color.light"}}>
                        80k
                    </Typography>
                    <Typography sx={{fontSize:12, color:"color.light"}}>
                        60k
                    </Typography>
                    <Typography sx={{fontSize:12, color:"color.light"}}>
                        40k
                    </Typography>
                    <Typography sx={{fontSize:12, color:"color.light"}}>
                        20k
                    </Typography>
                </Box>
                {data.map((item, index) => {
                    const heightPercent = (item.value / maxValue) * 100;

                    return (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                flex: 1
                            }}
                        >
                            {/* Bar Container */}
                            <Box
                                sx={{
                                    position: "relative",
                                    height: "180px",
                                    width: 14,
                                    borderRadius: 10,
                                    bgcolor: alpha("#1976d2", 0.15),
                                    display: "flex",
                                    alignItems: "flex-end"
                                }}
                            >
                                {/* Filled Bar */}
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: `${heightPercent}%`,
                                        borderRadius: 10,
                                        bgcolor: "primary.main"
                                    }}
                                />
                            </Box>

                            {/* Date */}
                            <Typography
                                fontSize={12}
                                sx={{ mt: 1, opacity: 0.6 }}
                            >
                                {item.date}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}

export default CardDashboardSummary;

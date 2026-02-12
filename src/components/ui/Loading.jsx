import { Box, CircularProgress, Typography } from "@mui/material";

function Loading({ fullScreen = false }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection:"column",
                alignItems: "center",
                justifyContent: "center",
                height: fullScreen ? "100vh" : "100%",
                width: "100%",
            }}
        >
            <CircularProgress />
            <Typography sx={{mt:2}}>
                Loading...
            </Typography>
            <Typography color="color.light" fontSize={10}>
                First load may be slow because the server is on a free tier.
            </Typography>
        </Box>
    );
}

export default Loading;

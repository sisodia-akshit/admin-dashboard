import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    CircularProgress,
    AppBar,
    Toolbar,
    Avatar
} from "@mui/material";
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../../hooks/useMutation';

import BookstoreLogo from "../../assets/BookstoreLogo4.png";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const { token } = useParams();

    const resetPasswordMutation = useResetPasswordMutation()

    const handleForm = (e) => {
        e.preventDefault();
        resetPasswordMutation.mutate({
            token,
            password
        });
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.100"
            }}
        >
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - 0px)` },
                    // ml: { md: `${280}px` },
                    boxShadow: "none",
                    bgcolor: "background.paper",
                    color: "color.main",
                    pt: .3
                }}
            >
                <Toolbar>
                    <Avatar
                        src={BookstoreLogo}
                        alt="Logo"
                        sx={{ width: 60, height: 60 }}
                    />
                </Toolbar>
            </AppBar>

            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: 400,
                    borderRadius: 3
                }}
            >
                <form onSubmit={handleForm}>
                    <Typography variant="h5" mb={3}>
                        Reset Password
                    </Typography>

                    <TextField
                        fullWidth
                        label="New Password"
                        type="password"
                        required
                        margin="normal"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={resetPasswordMutation.isPending}
                    >
                        {resetPasswordMutation.isPending ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Send"
                        )}
                    </Button>

                    {resetPasswordMutation.error && (
                        <Typography color="error" mt={2}>
                            {resetPasswordMutation.error.message}
                        </Typography>
                    )}
                </form>
            </Paper>
        </Box>
    )
}

export default ResetPassword
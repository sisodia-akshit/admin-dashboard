import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    AppBar,
    Toolbar,
    Avatar,
    CircularProgress
} from "@mui/material";
import { useState } from 'react'
import { useForgetPasswordMutation } from '../../hooks/useMutation';

import BookstoreLogo from "../../assets/BookstoreLogo4.png";
import Modal from "../models/Modal";
import { useNavigate } from "react-router-dom";


function ForgetPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false)
        navigate("/login")
    }

    const forgetPasswordMutation = useForgetPasswordMutation({ setMessage, setOpen });

    const handleLogin = (e) => {
        e.preventDefault();
        forgetPasswordMutation.mutate({
            email
        });
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "background.default",
            }}
        >
            {/* topbar   */}
            {<Modal open={open} onClose={onClose} title={"Password reset link sent"}>
                <Typography>
                    {message}
                </Typography>
                <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>Ok</Button>
            </Modal>}
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
                <form onSubmit={handleLogin}>
                    <Typography variant="h5" mb={3}>
                        Forgot Password
                    </Typography>

                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        required
                        margin="normal"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={forgetPasswordMutation.isPending}
                    >
                        {/* {forgetPasswordMutation.isPending ? "Sending..." : "Send"} */}
                        {forgetPasswordMutation.isPending ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Send"
                        )}
                    </Button>

                    {forgetPasswordMutation.error && (
                        <Typography color="error" mt={2}>
                            {forgetPasswordMutation.error.message}
                        </Typography>
                    )}
                </form>
            </Paper>
        </Box>
    )
}

export default ForgetPassword
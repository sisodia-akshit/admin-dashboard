import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    Divider,
    AppBar,
    Toolbar,
    Avatar,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser, generateOtp, verifyOtp } from "../services/authApi";
import { useEffect, useState } from "react";
import BookstoreLogo from "../assets/BookstoreLogo4.png";


const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [isOtpAvailable, setOtpAvailability] = useState(false);
    const [isPasswordForm, setIsPasswordForm] = useState(false)
    // otp related 
    const [secondsLeft, setSecondsLeft] = useState(0);


    const navigate = useNavigate();



    const generateOtpMutation = useMutation({
        mutationFn: generateOtp,
        onSuccess: (data) => {
            setMessage(data.otpSentTo)
            localStorage.setItem("signupForm", JSON.stringify(data.signupForm))
            setSecondsLeft(120)
            setOtpAvailability(true);
        },
    });

    const verifyMutation = useMutation({
        mutationFn: verifyOtp,
        onSuccess: (data) => {
            setOtp("")
            setOtpAvailability(false);
            setIsPasswordForm(true)
        },
    });

    const signupMutation = useMutation({
        mutationFn: createUser,
        onSuccess: (data) => {
            localStorage.removeItem("signupForm")
            setIsPasswordForm(false)
            navigate("/login")
        },
    });

    const signupFormHandler = (e) => {
        e.preventDefault()
        generateOtpMutation.mutate({
            name,
            email
        })
    }

    const handleVarify = (e) => {
        e.preventDefault();
        if (otp.length !== 4) {
            alert("Enter 4-digit OTP");
            return;
        }
        const formData = JSON.parse(localStorage.getItem("signupForm"))
        verifyMutation.mutate({
            email: formData.email,
            otp
        });
    };

    const signHandler = (e) => {
        e.preventDefault()
        const formData = JSON.parse(localStorage.getItem("signupForm"))
        signupMutation.mutate({
            name: formData.name,
            email: formData.email,
            password,
        })
    }

    const handleSendOtp = async () => {
        const formData = JSON.parse(localStorage.getItem("signupForm"))
        generateOtpMutation.mutate({ name: formData.name, email: formData.email })       // your API call
        setSecondsLeft(120);       // 60 seconds cooldown
    };

    useEffect(() => {
        if (secondsLeft === 0) return;

        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [secondsLeft]);



    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "background.default",
                mt: "80px"
            }}
        >
            {/* topbar   */}
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

            {/* <Box
                sx={{
                    width: 380,
                    p: 4,
                    borderRadius: 2,
                    backgroundColor: "background.paper",
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            > */}

            {/* STEP 1 – NAME + EMAIL */}
            {!isOtpAvailable && !isPasswordForm && (
                <Box
                    component="form"
                    onSubmit={signupFormHandler}
                    sx={{
                        width: "100%",
                        maxWidth: "450px",
                        p: {
                            md: 4,
                            xs: "32px 20px"
                        },
                        borderRadius: 2,
                        backgroundColor: "background.paper",
                        boxShadow: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <Toolbar sx={{
                        margin: "auto"
                    }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Avatar
                                src={BookstoreLogo}
                                alt="Logo"
                                sx={{ width: 100, height: 100 }}
                            />
                            <Typography variant="h6" align="center" fontWeight={600}>
                                Get Started with BookStore
                            </Typography>
                            <Typography variant="h7" sx={{
                                textAlign: "center",
                                fontSize: 13,
                                color: "color.light"
                            }}>
                                Create your free account
                            </Typography>
                        </Box>
                    </Toolbar>


                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() =>
                        (window.location.href =
                            "https://mern-bookstore-backend-o6qf.onrender.com/api/auth/google?redirect=admin")
                        }
                        sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            mt: 5,
                            height: "50px"
                        }}
                    >
                        <img
                            src="https://developers.google.com/identity/images/g-logo.png"
                            width="18"
                            alt="Google"
                        />
                        Continue with Google
                    </Button>
                    <Divider>or</Divider>


                    <TextField
                        required
                        label="Name"
                        onChange={(e) => setName(e.target.value)}
                        sx={{
                            width: "100%",
                            backgroundColor: "background.default",
                        }}
                    />

                    <TextField
                        required
                        type="email"
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            width: "100%",
                            backgroundColor: "background.default",
                        }}
                    />
                    {generateOtpMutation.error && (
                        <Typography color="error" fontSize="0.85rem">
                            {generateOtpMutation.error.message}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={generateOtpMutation.isPending}
                        sx={{
                            maxWidth: "180px",
                            width: "100%",
                            fontSize: 18,
                            py: 1.5,
                            mt: 4,
                            borderRadius: 3,
                        }}
                    >
                        {generateOtpMutation.isPending ? "Processing..." : "Next"}
                    </Button>



                    <Typography fontSize="0.85rem" textAlign="center">
                        Already have an account?{" "}
                        <Link component={NavLink} to="/login">
                            Login
                        </Link>
                    </Typography>


                </Box>
            )}

            {/* STEP 2 – OTP */}
            {isOtpAvailable && !isPasswordForm && (
                <Box component="form" onSubmit={handleVarify}>
                    <Typography variant="h5">Verify OTP</Typography>

                    <Typography fontSize="0.9rem">
                        OTP sent to:
                        <br />
                        <b>{message}</b>
                    </Typography>

                    <TextField
                        label="Enter OTP"
                        value={otp}
                        onChange={(e) =>
                            setOtp(e.target.value.replace(/\D/g, ""))
                        }
                        inputProps={{ maxLength: 4 }}
                        fullWidth
                    />

                    <Typography
                        fontSize="0.8rem"
                        color={secondsLeft > 0 ? "text.secondary" : "primary"}
                        sx={{ cursor: secondsLeft > 0 ? "default" : "pointer" }}
                        onClick={secondsLeft > 0 ? undefined : handleSendOtp}
                    >
                        {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : "Resend OTP"}
                    </Typography>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={verifyMutation.isPending}
                    >
                        {verifyMutation.isPending ? "Verifying..." : "Verify OTP"}
                    </Button>

                    {verifyMutation.error && (
                        <Typography color="error" fontSize="0.85rem">
                            {verifyMutation.error.message}
                        </Typography>
                    )}

                    <Typography fontSize="0.75rem" color="text.secondary">
                        OTP valid for 5 minutes
                    </Typography>
                </Box>
            )}

            {/* STEP 3 – PASSWORD */}
            {!isOtpAvailable && isPasswordForm && (
                <Box component="form" onSubmit={signHandler}>
                    <Typography variant="h5">Create Password</Typography>

                    <TextField
                        required
                        type="password"
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={signupMutation.isPending}
                    >
                        {signupMutation.isPending ? "Signing up..." : "Signup"}
                    </Button>

                    {signupMutation.error && (
                        <Typography color="error" fontSize="0.85rem">
                            {signupMutation.error.message}
                        </Typography>
                    )}
                </Box>
            )}
            {/* </Box> */}
        </Box>
    );
};


export default Signup;

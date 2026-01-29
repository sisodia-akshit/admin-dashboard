import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { createUser, generateOtp, verifyOtp } from "../services/authApi";
import { useEffect, useState } from "react";

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
    <div style={{ padding: "50px" }}>
      {(!isOtpAvailable && !isPasswordForm) && <form onSubmit={signupFormHandler}>
        <h2>Signup</h2>

        <input required placeholder="Name" onChange={e => setName(e.target.value)} /><br /><br />

        <input required type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} /> <br /><br />


        <button
          type="submit"
          disabled={generateOtpMutation.isPending}
          style={{ backgroundColor: generateOtpMutation.isPending ? "#ccc" : "blue", color: generateOtpMutation.isPending ? "#000" : "#fff" }}
        >
          {generateOtpMutation.isPending ? "Processing..." : "Next"}
        </button>

        {generateOtpMutation.error && (
          <p style={{ color: "red" }}>{generateOtpMutation.error.message}</p>
        )}

        <br /><br />
        <span>
          Already have an account?&nbsp;<NavLink to="/login" style={{ color: "blue", textDecoration: "none" }}>Login</NavLink>
        </span>
      </form>}
      {/* otp Form */}
      {(isOtpAvailable && !isPasswordForm) && <form onSubmit={handleVarify}>
        <h2>Verify OTP</h2>
        <p style={{ color: "#333" }}>Your OTP has been sent to your registered email address: <br />
          <span style={{ fontStyle: "italic", color: "#000" }}>{message}</span>
        </p>
        <br />
        <p style={{ color: "#333" }}>Please enter the OTP to verify.</p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          maxLength={4}
          placeholder="Enter OTP"
        /> &nbsp;
        <span
          onClick={handleSendOtp}
          style={{ fontSize: "0.8rem", color: secondsLeft > 0 ? "#777" : "blue", cursor: "pointer" }}
          disabled={secondsLeft > 0}
        >
          {secondsLeft > 0
            ? `${secondsLeft}`
            : "Resend OTP"}
        </span>
        <br />
        {generateOtpMutation.error && (
          <p style={{ color: "red" }}>{generateOtpMutation.error.message}</p>
        )}
        {verifyMutation.error && <p style={{ color: "red" }}>{verifyMutation.error.message}</p>}
        <button
          type="submit"
          disabled={verifyMutation.isPending}
          style={{ marginTop: 5, backgroundColor: verifyMutation.isPending ? "#ccc" : "blue", color: verifyMutation.isPending ? "#000" : "#fff" }}
        >
          {verifyMutation.isPending ? "Verifying" : "Verify OTP"}
        </button>
        <p style={{ color: "#333" }}>This code is valid for 5 minutes only.</p>

      </form>}
      {/* password form  */}
      {(!isOtpAvailable && isPasswordForm) && <form onSubmit={signHandler}>
        <h2>Signup</h2>
        <p >Create Password</p>
        <input required type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /><br /><br />

        <button
          type="submit"
          disabled={signupMutation.isPending}
          style={{ backgroundColor: signupMutation.isPending ? "#ccc" : "blue", color: verifyMutation.isPending ? "#000" : "#fff" }}
        >
          {signupMutation.isPending ? "Signing up..." : "Signup"}
        </button>

        {signupMutation.error && (
          <p style={{ color: "red" }}>{signupMutation.error.message}</p>
        )}
      </form>}
      {(!isOtpAvailable && !isPasswordForm) && <><p style={{ margin: "0px auto", color: "#999" }}>---------- or ----------</p>
        <button
          className="googleBtn"
          onClick={() =>
            window.location.href =
            // "http://localhost:5000/api/auth/google"
            "https://mern-bookstore-backend-o6qf.onrender.com/api/auth/google?redirect=admin"
          }
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            width="18"
          />
          Continue with Google
        </button>
      </>}
    </div>
  );
};


export default Signup;

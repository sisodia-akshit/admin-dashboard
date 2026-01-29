import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { forgetPassword } from '../services/authApi';

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate()
    const forgetPasswordMutation = useMutation({
        mutationFn: forgetPassword,
        onSuccess: (data) => {
            alert(data.message)
            navigate("/login")
        },
    });

    const handleLogin = (e) => {
        e.preventDefault();

        forgetPasswordMutation.mutate({
            email
        });
    };

    return (
        <div style={{ padding: "50px" }}>

            <form onSubmit={handleLogin}>
                <h2>Forget Password</h2>
                <label>Email</label><br />
                <input required type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <br /><br />

                <button type="submit" disabled={forgetPasswordMutation.isPending}>
                    {forgetPasswordMutation.isPending ? "Sending..." : "Send"}
                </button>

                {forgetPasswordMutation.error && (
                    <p style={{ color: "red" }}>{forgetPasswordMutation.error.message}</p>
                )}

                <br /><br />
            </form>
        </div>
    )
}

export default ForgetPassword
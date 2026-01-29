import { useMutation } from '@tanstack/react-query';
import { useState } from 'react'
import { resetPassword } from '../services/authApi';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {
    const [password, setPassword] = useState("");
    const { token } = useParams();
    const navigate = useNavigate()

    const resetPasswordMutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            console.log(data.message);
            navigate("/login")
        },
    });

    const handleForm = (e) => {
        e.preventDefault();

        resetPasswordMutation.mutate({
            token,
            password
        });
    };

    return (
        <div style={{ padding: "50px" }}>

            <form onSubmit={handleForm}>
                <h2>Reset Password</h2>
                <label>Password</label><br />
                <input required type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <br /><br />

                <button type="submit" disabled={resetPasswordMutation.isPending}>
                    {resetPasswordMutation.isPending ? "Sending..." : "Send"}
                </button>

                {resetPasswordMutation.error && (
                    <p style={{ color: "red" }}>{resetPasswordMutation.error.message}</p>
                )}

                <br /><br />
            </form>
        </div>
    )
}

export default ResetPassword
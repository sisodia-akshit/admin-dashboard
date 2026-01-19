import Modal from "./Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { setUserRole } from "../services/usersApi";

const ChangeRoleModel = ({updateUser, onClose }) => {
    const { user } = useAuth();

    const queryClient = useQueryClient();

    const [role, setRole] = useState("none");

    const updateRoleMutation = useMutation({
        mutationFn: setUserRole,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"],role });
            onClose();
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (role.toLowerCase() === updateUser.role) {
            alert("Invalid Role!!")
            return
        }
        updateRoleMutation.mutate({
            id:updateUser._id,
            role: role.toLowerCase(),
        });
    };

    if (user.role !== "admin") {
        return (
            <Modal onClose={onClose}>
                <p>You are not allowed to take this Action.</p>
                <button onClick={onClose}>Close</button>
            </Modal>
        );
    }

    return (
        <Modal onClose={onClose}>
            <h3>Change Role</h3>
            <form onSubmit={handleSubmit}>
                <select name="role" id="role" onChange={e => setRole(e.target.value)}>
                    <option value="user">None</option>
                    <option value="user">User</option>
                    <option value="operator">Operator</option>
                </select>
                <br />
                <br />
                <button type="submit" disabled={updateRoleMutation.isLoading}>
                    {updateRoleMutation.isLoading ? "Saving..." : "Save Changes"}
                </button>

                {updateRoleMutation.error && (
                    <p style={{ color: "red" }}>
                        {updateRoleMutation.error.message}
                    </p>
                )}
            </form>
        </Modal>
    );
};

export default ChangeRoleModel
    ;

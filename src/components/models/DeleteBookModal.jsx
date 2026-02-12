import Modal from "./Modal";
import { useAuth } from "../../context/AuthContext";
import { usedeleteMutation } from "../../hooks/useMutation";
import { Box, Button, Typography } from "@mui/material";

const DeleteBookModal = ({ book, onClose }) => {
    const { user } = useAuth();


    const deleteMutation = usedeleteMutation({ onClose })

    if (user?.role !== "admin") {
        return (
            <Modal open={open} onClose={onClose} title="Delete Item">
                <Typography>You are not authorized to delete books.</Typography>
                <Button onClick={onClose}>Close</Button>
            </Modal>
        );
    }

    return (
        <Modal open={open} onClose={onClose} title="Delete Item">
            <Box sx={{ display: "flex" }}>
                Are you sure you want to delete&nbsp;"
                <Typography fontWeight={600}>{book.title}</Typography>
                "&nbsp;?
            </Box>


            {deleteMutation.error && (
                <Typography style={{ color: "error.main" }}>
                    {deleteMutation.error.message}
                </Typography>
            )}

            <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
                <Button variant="contained"
                    onClick={() => deleteMutation.mutate(book._id)}
                    disabled={deleteMutation.isLoading}
                    style={{ background: "red", color: "white" }}
                >
                    {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                </Button>

                <Button variant="outlined" onClick={onClose}>
                    Cancel
                </Button>
            </Box>


        </Modal>
    );
};

export default DeleteBookModal;

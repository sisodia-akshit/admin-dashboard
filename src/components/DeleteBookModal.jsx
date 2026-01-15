import Modal from "./Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook } from "../services/booksApi";
import { useAuth } from "../context/AuthContext";

const DeleteBookModal = ({ book, onClose }) => {
    const { user } = useAuth();

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
            onClose();
        },
    });

    if (user?.role !== "admin") {
        return (
            <Modal onClose={onClose}>
                <p>You are not authorized to delete books.</p>
                <button onClick={onClose}>Close</button>
            </Modal>
        );
    }

    return (
        <Modal onClose={onClose}>
            <h3>Delete Book</h3>

            <p>
                Are you sure you want to delete
                <strong> {book.title}</strong>?
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
                <button
                    onClick={() => deleteMutation.mutate(book._id)}
                    disabled={deleteMutation.isLoading}
                    style={{ background: "red", color: "white" }}
                >
                    {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                </button>

                <button onClick={onClose}>
                    Cancel
                </button>
            </div>

            {deleteMutation.error && (
                <p style={{ color: "red" }}>
                    {deleteMutation.error.message}
                </p>
            )}
        </Modal>
    );
};

export default DeleteBookModal;

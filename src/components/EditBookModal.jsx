import Modal from "./Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBook, updateMyBook } from "../services/booksApi";
import { useAuth } from "../context/AuthContext";
import { CATEGORY_GENRES } from "../config/genres";

const EditBookModal = ({ book, onClose }) => {
    const { user } = useAuth();

    const queryClient = useQueryClient();

    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [price, setPrice] = useState(book.price);
    // const [pages, setPages] = useState(book.pages);
    const [description, setDescription] = useState(book.description);
    const [category, setCategory] = useState(book.category);
    const [genres, setGenres] = useState(book.genres)
    const [stock, setStock] = useState(book.stock);

    const handleGenresHandler = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        if (genres.includes(value)) setGenres(prev => prev.filter(genre => genre !== value));
        if (value !== "None" && isChecked && !genres.includes(value) && !(genres.length === 5)) setGenres(prev => [...prev, value]);
    }

    const updateBookMutation = useMutation({
        mutationFn: user.role === "admin" ? updateBook : updateMyBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["books"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
            onClose();
        },
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        updateBookMutation.mutate({
            _id: book._id,
            title,
            author,
            price: Number(price),
            // pages: Number(pages),
            stock: Number(stock),
            category,
            genres,
            description,
        });



    };

    if (user.role !== "admin" && book.createdBy !== user._id) {
        return (
            <Modal onClose={onClose}>
                <p>You are not allowed to edit this book.</p>
                <button onClick={onClose}>Close</button>
            </Modal>
        );
    }

    return (
        <Modal onClose={onClose}>
            <h3>Edit Book</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", marginBottom: 10 }}>
                    <input
                        required
                        placeholder="Title *"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    &nbsp;
                    <input
                        required
                        placeholder="Author *"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                <div style={{ display: "flex", marginBottom: 10 }}>
                    <input
                        required
                        type="number"
                        placeholder="Price *"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    &nbsp;
                    <input
                        required
                        type="number"
                        placeholder="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />

                </div>

                {/* <div style={{ display: "flex", marginBottom: 10 }}>
                    <input
                        type="number"
                        placeholder="Number of Pages"
                        value={pages}
                        onChange={(e) => setPages(e.target.value)}
                    />
                </div> */}
                <legend>Category & Genre</legend>
                <div>
                    <select name="category" id="category" className='formSelect'
                        value={category}
                        onChange={(e) => { setCategory(e.target.value) }}
                    >
                        <option value="None">None</option>
                        {Object.keys(CATEGORY_GENRES).map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <div className="formGenre">
                        {CATEGORY_GENRES[category]?.map((genre, i) => (
                            <label key={i} className="formGenreLabel">
                                {genres.includes(genre) && <input
                                    type="checkbox"
                                    checked
                                    value={genre}
                                    onChange={handleGenresHandler}
                                />}
                                {!(genres.includes(genre)) && <input
                                    type="checkbox"
                                    value={genre}
                                    onChange={handleGenresHandler}
                                />}
                                {genre}
                            </label>
                        ))}
                    </div>
                    {genres.length > 0 && (
                        <>
                            <p style={{ fontSize: "14px", marginTop: "8px" }}>
                                Category: <span style={{ color: "#555" }}>{category}</span> <br />
                                Genres: <span style={{ color: "#555" }}>{genres.join(", ")}</span> <span style={{ fontSize: 10, color: "#999" }}>({genres.length}/5)</span>
                            </p>
                        </>
                    )}
                </div>
                <div style={{ marginTop: 10 }}>
                    <textarea style={{ width: "100%" }} id='description' value={description} placeholder='Description' rows={5} onChange={(e) => setDescription(e.target.value)} />
                    <p style={{ fontSize: 10, color: "#999", textAlign: "right", margin: 0 }}>({description.length}/2000)</p>
                </div>
                <br /><br />
                {updateBookMutation.error && (
                    <p style={{ color: "red" }}>
                        {updateBookMutation.error.message}
                    </p>
                )}
                <button type="submit" disabled={updateBookMutation.isPending}>
                    {(updateBookMutation.isPending) ? "Saving..." : "Save"}
                </button>


            </form>

        </Modal>
    );
};

export default EditBookModal;

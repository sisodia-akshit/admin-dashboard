import Modal from "./Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook } from "../services/booksApi";
import API from "../services/api";
import { CATEGORY_GENRES } from "../config/genres";

const CreateBookModal = ({ onClose }) => {

    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    // const [pages, setPages] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("None");
    const [genres, setGenres] = useState([])
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null);

    const [uploading, setUploading] = useState(false)

    const handleGenresHandler = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        if (genres.includes(value)) setGenres(prev => prev.filter(genre => genre !== value));
        if (value !== "None" && isChecked && !genres.includes(value) && !(genres.length === 5)) setGenres(prev => [...prev, value]);
    }

    const createBookMutation = useMutation({
        mutationFn: createBook,
        onSuccess: () => {
            // 🔑 refresh books list
            queryClient.invalidateQueries({ queryKey: ["books"] });

            // (optional, if dashboard shows book stats later)
            queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });

            onClose();
        },
    });

    const uploadImage = async (file) => {

        // 1. get signature
        const sigRes = await API.get("/cloudinary/signature", { withCredentials: true });

        const { timestamp, signature, cloudName, apiKey } = sigRes.data;
        // 2. upload to cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", "books");

        const uploadRes = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!uploadRes.ok) {
            throw new Error("Image upload failed");
        }

        const data = await uploadRes.json();
        return data.secure_url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!image) {
                alert("Please select an image");
                return;
            }
            setUploading(true);

            const coverImage = await uploadImage(image);

            createBookMutation.mutate({
                title,
                author,
                price: Number(price),
                stock: Number(stock),
                // pages: Number(pages),
                category,
                genres,
                description,
                coverImage,
            });

            setUploading(false)
        } catch (error) {
            alert("Something went wrong");
            setUploading(false)
        }
    };

    return (
        <Modal onClose={onClose}>
            <h3>Add New Book</h3>
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
                        {CATEGORY_GENRES[category]?.map((genre) => (
                            <label key={genre} className="formGenreLabel">
                                <input
                                    type="checkbox"
                                    value={genre}
                                    onChange={handleGenresHandler}
                                />
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
                <div style={{marginTop:10}}>
                    <textarea style={{ width: "100%" }} id='description' value={description} placeholder='Description' rows={5} onChange={(e) => setDescription(e.target.value)} />
                    <p style={{ fontSize: 10, color: "#999", textAlign: "right", margin:0}}>({description.length}/2000)</p>
                </div>
                <legend>Cover Image</legend>
                <input required name='productImg' type="file" id="selectImage" accept="image/*" placeholder='Book Image' className='formInput' onChange={(e) => setImage(e.target.files[0])} />
                <br /><br />
                {createBookMutation.error && (
                    <p style={{ color: "red" }}>
                        {createBookMutation.error.message}
                    </p>
                )}
                <button type="submit" disabled={createBookMutation.isPending || uploading}>
                    {(createBookMutation.isPending || uploading) ? "Saving..." : "Create Book"}
                </button>


            </form>
        </Modal>
    );
};

export default CreateBookModal;

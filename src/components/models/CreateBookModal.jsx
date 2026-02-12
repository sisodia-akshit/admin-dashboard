import {
    Box,
    TextField,
    Grid,
    Button,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    FormGroup,
} from "@mui/material";

import Modal from "./Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook } from "../../services/booksApi";
import API from "../../services/api";
import { CATEGORY_GENRES } from "../../config/genres";

const CreateBookModal = ({ open, onClose }) => {

    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
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
        <Modal open={open} onClose={onClose} title="New Inventory Item">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

                {/* Title + Author */}
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            required
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            required
                            label="Author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            size="small"
                        />
                    </Grid>
                </Grid>

                {/* Price + Stock */}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            required
                            type="number"
                            label="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            size="small"
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            size="small"
                        />
                    </Grid>
                </Grid>

                {/* Category */}
                <Box sx={{ mt: 2 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value="None">None</MenuItem>
                            {Object.keys(CATEGORY_GENRES).map((cat) => (
                                <MenuItem key={cat} value={cat}>
                                    {cat}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Genres */}
                <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Genres</Typography>
                    <FormGroup row>
                        {CATEGORY_GENRES[category]?.map((genre) => (
                            <FormControlLabel
                                key={genre}
                                control={
                                    <Checkbox
                                        value={genre}
                                        onChange={handleGenresHandler}
                                    />
                                }
                                label={genre}
                            />
                        ))}
                    </FormGroup>
                </Box>

                {/* Description */}
                <Box sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        inputProps={{ maxLength: 2000 }}
                    />
                    <Typography
                        variant="caption"
                        sx={{ display: "block", textAlign: "right" }}
                    >
                        {description.length}/2000
                    </Typography>
                </Box>

                {/* Image */}
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="outlined"
                        component="label"
                    >
                        Upload Cover Image
                        <input
                            hidden
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Button>
                </Box>

                {/* Error */}
                {createBookMutation.error && (
                    <Typography color="error" sx={{ mt: 1 }}>
                        {createBookMutation.error.message}
                    </Typography>
                )}

                {/* Submit */}
                <Box sx={{ mt: 3, textAlign: "right" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={createBookMutation.isPending || uploading}
                    >
                        {(createBookMutation.isPending || uploading)
                            ? "Saving..."
                            : "Create Book"}
                    </Button>
                </Box>

            </Box>
        </Modal>

    );
};

export default CreateBookModal;

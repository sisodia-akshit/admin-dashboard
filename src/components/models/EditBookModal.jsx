import Modal from "./Modal";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { CATEGORY_GENRES } from "../../config/genres";
import { useUpdateBookMutation } from "../../hooks/useMutation";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

const EditBookModal = ({ book, onClose, open }) => {
    const { user } = useAuth();


    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [price, setPrice] = useState(book.price);
    const [description, setDescription] = useState(book.description);
    const [category, setCategory] = useState(book.category);
    const [genres, setGenres] = useState(book.genres)
    const [stock, setStock] = useState(book.stock);
    const [canUpdate, setCanUpdate] = useState(false);


    const titleHandler = (e) => {
        setTitle(e.target.value);
        setCanUpdate(true);
    }
    const authorHandler = (e) => {
        setAuthor(e.target.value);
        setCanUpdate(true);

    }
    const priceHandler = (e) => {
        setPrice(e.target.value)
        setCanUpdate(true);
    }
    const stockHandler = (e) => {
        setStock(e.target.value);
        setCanUpdate(true);
    }
    const categoryHandler = (e) => {
        setCategory(e.target.value)
        setCanUpdate(true);
    }
    const handleGenresHandler = (e) => {
        const value = e.target.value.toLowerCase();
        const isChecked = e.target.checked;
        if (genres.includes(value)) {
            setGenres(prev => prev.filter(genre => genre !== value))
            setCanUpdate(true)
        };
        if (value !== "None" && isChecked && !genres.includes(value) && !(genres.length === 5)) {
            setGenres(prev => [...prev, value]);
            setCanUpdate(true)
        }
    }
    const descriptionHandler = (e) => {
        setDescription(e.target.value)
        setCanUpdate(true);

    }

    const updateBookMutation = useUpdateBookMutation({ onClose })

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateBookMutation.mutate({
            _id: book._id,
            title,
            author,
            price: Number(price),
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
        <Modal open={open} onClose={onClose} title="Update Item">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>


                {/* Submit */}
                <Box sx={{ textAlign: "right" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={updateBookMutation.isPending || !canUpdate}
                    >
                        {(updateBookMutation.isPending)
                            ? "Updating..."
                            : "Update Book"}
                    </Button>
                </Box>
                {/* Error */}
                {updateBookMutation.error && (
                    <Typography color="error">
                        {updateBookMutation.error.message}
                    </Typography>
                )}

                {/* Title + Author */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid>
                        <TextField
                            fullWidth
                            required
                            label="Title"
                            value={title}
                            onChange={titleHandler}
                            size="small"
                        />
                    </Grid>

                    <Grid>
                        <TextField
                            fullWidth
                            required
                            label="Author"
                            value={author}
                            onChange={authorHandler}
                            size="small"
                        />
                    </Grid>
                </Grid>

                {/* Price + Stock */}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid>
                        <TextField
                            fullWidth
                            required
                            type="number"
                            label="Price"
                            value={price}
                            onChange={priceHandler}
                            size="small"
                        />
                    </Grid>

                    <Grid>
                        <TextField
                            fullWidth
                            type="number"
                            label="Stock"
                            value={stock}
                            onChange={stockHandler}
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
                            onChange={categoryHandler}
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
                                        checked={genres.includes(genre.toLowerCase())}
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
                        onChange={descriptionHandler}
                        inputProps={{ maxLength: 2000 }}
                    />
                    <Typography
                        variant="caption"
                        sx={{ display: "block", textAlign: "right" }}
                    >
                        {description.length}/2000
                    </Typography>
                </Box>


            </Box>
        </Modal>
    );
};

export default EditBookModal;

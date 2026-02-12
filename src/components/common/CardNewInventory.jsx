import {
    Box,
    TextField,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    FormGroup,
} from "@mui/material";
import { useState } from "react";
import { CATEGORY_GENRES } from "../../config/genres";


function CardNewInventory({ stateValue, setTitle, setAuthor, setPrice, setStock, setCategory, setGenres, setDescription }) {


    const handleGenresHandler = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;
        if (stateValue.genres.includes(value)) setGenres(prev => prev.filter(genre => genre !== value));
        if (value !== "None" && isChecked && !stateValue.genres.includes(value) && !(stateValue.genres.length === 5)) setGenres(prev => [...prev, value]);
    }

    // const createBookMutation = 

    // const uploadImage = async (file) => {

    //     // 1. get signature
    //     const sigRes = await API.get("/cloudinary/signature", { withCredentials: true });

    //     const { timestamp, signature, cloudName, apiKey } = sigRes.data;
    //     // 2. upload to cloudinary
    //     const formData = new FormData();
    //     formData.append("file", file);
    //     formData.append("api_key", apiKey);
    //     formData.append("timestamp", timestamp);
    //     formData.append("signature", signature);
    //     formData.append("folder", "books");

    //     const uploadRes = await fetch(
    //         `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    //         {
    //             method: "POST",
    //             body: formData,
    //         }
    //     );

    //     if (!uploadRes.ok) {
    //         throw new Error("Image upload failed");
    //     }

    //     const data = await uploadRes.json();
    //     return data.secure_url;
    // };

    
    return (
        <Box
            sx={{
                bgcolor: "background.paper",
                p: { md: 4, xs: 2 },
                borderRadius: 3,
                display: "grid",
                gridTemplateColumns: { md: "repeat(auto-fit, minmax(240px, 1fr))", xs: "repeat(auto-fit, minmax(250px, 1fr))" },
                gap: 4,
                width: "100%"
            }}
        >
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%"
            }}>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        required
                        label="Title"
                        value={stateValue.title}
                        onChange={(e) => setTitle(e.target.value)}
                        size="medium"
                    />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        required
                        label="Author"
                        value={stateValue.author}
                        onChange={(e) => setAuthor(e.target.value)}
                        size="medium"
                    />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        required
                        type="number"
                        label="Price"
                        value={stateValue.price}
                        onChange={(e) => setPrice(e.target.value)}
                        size="medium"
                    />
                </Box>
                <Box sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        required
                        type="number"
                        label="Quantity in Stock"
                        value={stateValue.stock}
                        onChange={(e) => setStock(e.target.value)}
                        size="medium"
                    />
                </Box>
            </Box>

            <Box sx={{
                display: "flex",
                flexDirection: "column"
            }}>
                {/* Category */}
                <Box sx={{ mt: 2 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={stateValue.category}
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
                <Box sx={{ mt: 2, }}>
                    <Typography variant="subtitle2">Genres</Typography>
                    <FormGroup row sx={{ bgcolor: "background.default", p: 1, borderRadius: 2 }}>
                        {CATEGORY_GENRES[stateValue.category] ? CATEGORY_GENRES[stateValue.category].map((genre) => (
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
                        )) :
                            <Typography fontSize={12} color="color.light">
                                Select a Catagory to add Genre
                            </Typography>
                        }
                    </FormGroup>
                </Box>

                {/* Description */}
                <Box sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Description"
                        value={stateValue.description}
                        onChange={(e) => setDescription(e.target.value)}
                        inputProps={{ maxLength: 2000 }}
                    />
                    <Typography
                        variant="caption"
                        sx={{ display: "block", textAlign: "right" }}
                    >
                        {stateValue.description.length}/2000
                    </Typography>
                </Box>
            </Box>

            {/* Image */}
            {/* <Box sx={{ mt: 2 }}>
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
            </Box> */}

            {/* Error */}
            {/* {createBookMutation.error && (
                <Typography color="error" sx={{ mt: 1 }}>
                    {createBookMutation.error.message}
                </Typography>
            )} */}

            {/* Submit */}
            {/* <Box sx={{ mt: 3, textAlign: "right" }}>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={createBookMutation.isPending || uploading}
                >
                    {(createBookMutation.isPending || uploading)
                        ? "Saving..."
                        : "Create Book"}
                </Button>
            </Box> */}

        </Box>
    )
}

export default CardNewInventory
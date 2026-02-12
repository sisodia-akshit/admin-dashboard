import { Box, Button, Typography } from '@mui/material'
import Grid from "@mui/material/Grid";
import DashboardLayout from '../components/layout/DashboardLayout'
// import CreateBookModal from '../components/models/CreateBookModal'
import CardNewInventory from '../components/common/CardNewInventory'
import CardUploadImage from '../components/common/CardUploadImage'
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateBookMutation } from '../hooks/useMutation';
import { useUploadImage } from '../hooks/useUploadImage';

function AddInventory() {
    const createBookMutation = useCreateBookMutation();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("None");
    const [genres, setGenres] = useState([])
    const [stock, setStock] = useState("");

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false)


    const CreateItemHandler = async (e) => {
        e.preventDefault();
        try {
            if (!image) {
                alert("Please select an image");
                return;
            }
            setUploading(true);

            const coverImage = await useUploadImage(image);

            createBookMutation.mutate({
                title,
                author,
                price: Number(price),
                stock: Number(stock),
                category,
                genres,
                description,
                coverImage,
            });

            setUploading(false)
        } catch (error) {
            alert("Something went wrong");
            console.log(error)
            setUploading(false)
        }
    }
    return (
        <DashboardLayout>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                {/* Error */}
                {createBookMutation.error && (
                    <Typography color="error" sx={{ mt: 1 }}>
                        {createBookMutation.error.message}
                    </Typography>
                )}
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 1,
                    }}
                >
                    <Typography variant="h6" fontWeight={600}>
                        New Inventory Item
                    </Typography>

                    <Button
                        variant="contained"
                        size="small"
                        onClick={CreateItemHandler}
                        disabled={createBookMutation.isPending || uploading}

                    >
                        {(createBookMutation.isPending || uploading)
                            ? "Saving..."
                            : "Create Book"}
                    </Button>
                </Box>

                {/* Content */}
                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: { md: "2fr 1fr", xs: "1fr" },
                    gap: 4,
                }}>
                    <CardNewInventory
                        setTitle={setTitle}
                        setAuthor={setAuthor}
                        setPrice={setPrice}
                        setStock={setStock}
                        setCategory={setCategory}
                        setGenres={setGenres}
                        setDescription={setDescription}
                        stateValue={{
                            title,
                            author,
                            price,
                            stock,
                            category,
                            genres,
                            description,
                        }}
                    />
                    <CardUploadImage image={image} setImage={setImage} />
                </Box>

            </Box>
        </DashboardLayout>
    )
}

export default AddInventory
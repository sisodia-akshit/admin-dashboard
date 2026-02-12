import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react'

function CardUploadImage({ image, setImage }) {
    const previewUrl = image ? URL.createObjectURL(image) : null;

    return (
        <Box sx={{
            width: "100%",
            bgcolor: "background.paper",
            p: { md: 4, xs: 2 },
            borderRadius: 3,
            
        }}>
            {!image ?
                <Button
                    variant="text"
                    component="label"
                    fullWidth
                    sx={{
                        height: "250px",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "center",
                        border: "1px solid #ccc",
                        backgroundColor: "background.default"
                    }}
                >
                    <Typography variant='h7' fontWeight={600}>
                        Upload Image
                    </Typography>
                    <Typography variant='h7' sx={{ fontSize: 12, color: "color.light" }}>
                        Upload a cover image for your product.
                    </Typography>

                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </Button> :
                <Box
                    component="img"
                    src={previewUrl}
                    alt="product"
                    sx={{
                        width: "100%",
                        height: 200,
                        objectFit: "contain",
                        borderRadius: 2,
                        
                    }}
                />
            }
        </Box>
    )
}

export default CardUploadImage
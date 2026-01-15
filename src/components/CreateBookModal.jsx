import Modal from "./Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook } from "../services/booksApi";
import API from "../services/api";

const CreateBookModal = ({ onClose }) => {

    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [pages, setPages] = useState("");
    const [description, setDescription] = useState("");
    const [ratings, setRatings] = useState("")
    const [isAvailable, setAvailability] = useState(true)
    const [genres, setGenres] = useState([])
    const [stock, setStock] = useState("");
    const [image, setImage] = useState(null);

    const [uploading, setUploading] = useState(false)



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

    const ratingHandler = (e) => {
        if (e.target.value > 10) {
            alert("Ratings must not greater than 10.0")
            setRatings("")
        } else {
            setRatings(e.target.value)
        }
    }

    const uploadImage = async (file) => {
       
        // 1. get signature
        const sigRes = await API.get("/cloudinary/signature",{withCredentials:true});

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
                pages: Number(pages),
                ratings: Number(ratings),
                stock: Number(stock),
                isAvailable,
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
                <div style={{ display: "flex" }}>
                    <input
                        required
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    &nbsp;
                    <input
                        required
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>

                <br />

                <div style={{ display: "flex" }}>
                    <input
                        required
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    &nbsp;
                    <input
                        required
                        type="number"
                        placeholder="Pages"
                        value={pages}
                        onChange={(e) => setPages(e.target.value)}
                    />
                </div>

                <br />
                <div style={{ display: "flex" }}>
                    <input
                        required
                        type="number"
                        placeholder="Ratings"
                        value={ratings}
                        onChange={ratingHandler}
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
                <br />

                <legend>Genres</legend>
                <div cstyle={{ display: "flex" }}>
                    <select name="genre" id="genre" className='formSelect' onChange={(e) => {
                        const value = e.target.value;
                        if (value !== "None" && !genres.includes(value)) {
                            setGenres(prev => [...prev, value]);
                        }
                    }} >
                        <option value="None">None</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Literary Fiction">Literary Fiction</option>
                        <option value="Psychological Fiction">Psychological Fiction</option>
                        <option value="Philosophical Fiction">Philosophical Fiction</option>
                        <option value="Classic">Classic</option>
                        <option value="Suspense">Suspense</option>
                        <option value="Historical">Historical</option>
                        <option value="Drama">Drama</option>
                        <option value="Crime">Crime</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Horror">Horror</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Romance">Romance</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Biography">Biography</option>
                        <option value="Autobiography">Autobiography</option>
                        <option value="Memoir">Memoir</option>
                        <option value="Self-Help">Self-Help</option>
                        <option value="Poetry">Poetry</option>
                        <option value="Young Adult">Young Adult</option>
                        <option value="Children's Literature">Children's Literature</option>
                        <option value="Graphic Novel">Graphic Novel</option>
                        <option value="Satire">Satire</option>
                        <option value="Humor">Humor</option>
                        <option value="Religious">Religious</option>
                        <option value="Political">Political</option>
                        <option value="Business">Business</option>
                        <option value="Educational">Educational</option>
                        <option value="Cookbook">Cookbook</option>
                        <option value="Travel">Travel</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Historical Fiction">Historical Fiction</option>
                        <option value="Contemporary Fiction">Contemporary Fiction</option>
                        <option value="Dystopian">Dystopian</option>
                        <option value="Cyberpunk">Cyberpunk</option>
                        <option value="Epic">Epic</option>
                        <option value="Mythology">Mythology</option>
                        <option value="Spirituality">Spirituality</option>
                        <option value="True Crime">True Crime</option>
                        <option value="Gothic">Gothic</option>
                        <option value="LGBT">LGBT</option>
                        <option value="Travelogue">Travelogue</option>
                    </select>
                    <select name="genre" id="genre" className='formSelect' onChange={(e) => {
                        const value = e.target.value;
                        if (value !== "None" && !genres.includes(value)) {
                            setGenres(prev => [...prev, value]);
                        }
                    }} >
                        <option value="None">None</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Literary Fiction">Literary Fiction</option>
                        <option value="Psychological Fiction">Psychological Fiction</option>
                        <option value="Philosophical Fiction">Philosophical Fiction</option>
                        <option value="Classic">Classic</option>
                        <option value="Suspense">Suspense</option>
                        <option value="Historical">Historical</option>
                        <option value="Drama">Drama</option>
                        <option value="Crime">Crime</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Horror">Horror</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Romance">Romance</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Biography">Biography</option>
                        <option value="Autobiography">Autobiography</option>
                        <option value="Memoir">Memoir</option>
                        <option value="Self-Help">Self-Help</option>
                        <option value="Poetry">Poetry</option>
                        <option value="Young Adult">Young Adult</option>
                        <option value="Children's Literature">Children's Literature</option>
                        <option value="Graphic Novel">Graphic Novel</option>
                        <option value="Satire">Satire</option>
                        <option value="Humor">Humor</option>
                        <option value="Religious">Religious</option>
                        <option value="Political">Political</option>
                        <option value="Business">Business</option>
                        <option value="Educational">Educational</option>
                        <option value="Cookbook">Cookbook</option>
                        <option value="Travel">Travel</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Historical Fiction">Historical Fiction</option>
                        <option value="Contemporary Fiction">Contemporary Fiction</option>
                        <option value="Dystopian">Dystopian</option>
                        <option value="Cyberpunk">Cyberpunk</option>
                        <option value="Epic">Epic</option>
                        <option value="Mythology">Mythology</option>
                        <option value="Spirituality">Spirituality</option>
                        <option value="True Crime">True Crime</option>
                        <option value="Gothic">Gothic</option>
                        <option value="LGBT">LGBT</option>
                        <option value="Travelogue">Travelogue</option>
                    </select>
                    <select name="genre" id="genre" className='formSelect' onChange={(e) => {
                        const value = e.target.value;
                        if (value !== "None" && !genres.includes(value)) {
                            setGenres(prev => [...prev, value]);
                        }
                    }} >
                        <option value="None">None</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Literary Fiction">Literary Fiction</option>
                        <option value="Psychological Fiction">Psychological Fiction</option>
                        <option value="Philosophical Fiction">Philosophical Fiction</option>
                        <option value="Classic">Classic</option>
                        <option value="Suspense">Suspense</option>
                        <option value="Historical">Historical</option>
                        <option value="Drama">Drama</option>
                        <option value="Crime">Crime</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Horror">Horror</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Romance">Romance</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Biography">Biography</option>
                        <option value="Autobiography">Autobiography</option>
                        <option value="Memoir">Memoir</option>
                        <option value="Self-Help">Self-Help</option>
                        <option value="Poetry">Poetry</option>
                        <option value="Young Adult">Young Adult</option>
                        <option value="Children's Literature">Children's Literature</option>
                        <option value="Graphic Novel">Graphic Novel</option>
                        <option value="Satire">Satire</option>
                        <option value="Humor">Humor</option>
                        <option value="Religious">Religious</option>
                        <option value="Political">Political</option>
                        <option value="Business">Business</option>
                        <option value="Educational">Educational</option>
                        <option value="Cookbook">Cookbook</option>
                        <option value="Travel">Travel</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Historical Fiction">Historical Fiction</option>
                        <option value="Contemporary Fiction">Contemporary Fiction</option>
                        <option value="Dystopian">Dystopian</option>
                        <option value="Cyberpunk">Cyberpunk</option>
                        <option value="Epic">Epic</option>
                        <option value="Mythology">Mythology</option>
                        <option value="Spirituality">Spirituality</option>
                        <option value="True Crime">True Crime</option>
                        <option value="Gothic">Gothic</option>
                        <option value="LGBT">LGBT</option>
                        <option value="Travelogue">Travelogue</option>
                    </select>
                    <select name="genre" id="genre" className='formSelect' onChange={(e) => {
                        const value = e.target.value;
                        if (value !== "None" && !genres.includes(value)) {
                            setGenres(prev => [...prev, value]);
                        }
                    }} >
                        <option value="None">None</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Literary Fiction">Literary Fiction</option>
                        <option value="Psychological Fiction">Psychological Fiction</option>
                        <option value="Philosophical Fiction">Philosophical Fiction</option>
                        <option value="Classic">Classic</option>
                        <option value="Suspense">Suspense</option>
                        <option value="Historical">Historical</option>
                        <option value="Drama">Drama</option>
                        <option value="Crime">Crime</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Horror">Horror</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Romance">Romance</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Biography">Biography</option>
                        <option value="Autobiography">Autobiography</option>
                        <option value="Memoir">Memoir</option>
                        <option value="Self-Help">Self-Help</option>
                        <option value="Poetry">Poetry</option>
                        <option value="Young Adult">Young Adult</option>
                        <option value="Children's Literature">Children's Literature</option>
                        <option value="Graphic Novel">Graphic Novel</option>
                        <option value="Satire">Satire</option>
                        <option value="Humor">Humor</option>
                        <option value="Religious">Religious</option>
                        <option value="Political">Political</option>
                        <option value="Business">Business</option>
                        <option value="Educational">Educational</option>
                        <option value="Cookbook">Cookbook</option>
                        <option value="Travel">Travel</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Historical Fiction">Historical Fiction</option>
                        <option value="Contemporary Fiction">Contemporary Fiction</option>
                        <option value="Dystopian">Dystopian</option>
                        <option value="Cyberpunk">Cyberpunk</option>
                        <option value="Epic">Epic</option>
                        <option value="Mythology">Mythology</option>
                        <option value="Spirituality">Spirituality</option>
                        <option value="True Crime">True Crime</option>
                        <option value="Gothic">Gothic</option>
                        <option value="LGBT">LGBT</option>
                        <option value="Travelogue">Travelogue</option>
                    </select>
                    <select name="genre" id="genre" className='formSelect' onChange={(e) => {
                        const value = e.target.value;
                        if (value !== "None" && !genres.includes(value)) {
                            setGenres(prev => [...prev, value]);
                        }
                    }} >
                        <option value="None">None</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Literary Fiction">Literary Fiction</option>
                        <option value="Psychological Fiction">Psychological Fiction</option>
                        <option value="Philosophical Fiction">Philosophical Fiction</option>
                        <option value="Classic">Classic</option>
                        <option value="Suspense">Suspense</option>
                        <option value="Historical">Historical</option>
                        <option value="Drama">Drama</option>
                        <option value="Crime">Crime</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Science Fiction">Science Fiction</option>
                        <option value="Horror">Horror</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Romance">Romance</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Biography">Biography</option>
                        <option value="Autobiography">Autobiography</option>
                        <option value="Memoir">Memoir</option>
                        <option value="Self-Help">Self-Help</option>
                        <option value="Poetry">Poetry</option>
                        <option value="Young Adult">Young Adult</option>
                        <option value="Children's Literature">Children's Literature</option>
                        <option value="Graphic Novel">Graphic Novel</option>
                        <option value="Satire">Satire</option>
                        <option value="Humor">Humor</option>
                        <option value="Religious">Religious</option>
                        <option value="Political">Political</option>
                        <option value="Business">Business</option>
                        <option value="Educational">Educational</option>
                        <option value="Cookbook">Cookbook</option>
                        <option value="Travel">Travel</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Historical Fiction">Historical Fiction</option>
                        <option value="Contemporary Fiction">Contemporary Fiction</option>
                        <option value="Dystopian">Dystopian</option>
                        <option value="Cyberpunk">Cyberpunk</option>
                        <option value="Epic">Epic</option>
                        <option value="Mythology">Mythology</option>
                        <option value="Spirituality">Spirituality</option>
                        <option value="True Crime">True Crime</option>
                        <option value="Gothic">Gothic</option>
                        <option value="LGBT">LGBT</option>
                        <option value="Travelogue">Travelogue</option>
                    </select>
                </div>
                {genres.length > 0 && (
                    <><br />
                        <p style={{ fontSize: "14px", marginTop: "8px" }}>
                            Selected: {genres.join(", ")}
                        </p>
                    </>
                )}
                <br />
                <textarea style={{ width: "100%" }} id='description' value={description} placeholder='Description' maxLength={300} rows={5} onChange={(e) => setDescription(e.target.value)} />
                <br />
                <br />
                <legend>Cover Image</legend>
                <input required name='productImg' type="file" id="selectImage" accept="image/*" placeholder='Select Image' className='formInput' onChange={(e) => setImage(e.target.files[0])} />
                <br /><br />

                <button type="submit" disabled={createBookMutation.isLoading || uploading}>
                    {(createBookMutation.isLoading || uploading) ? "Saving..." : "Create Book"}
                </button>

                {createBookMutation.error && (
                    <p style={{ color: "red" }}>
                        {createBookMutation.error.message}
                    </p>
                )}
            </form>
        </Modal>
    );
};

export default CreateBookModal;

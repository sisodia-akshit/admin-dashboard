import API from "../services/api";

export const useUploadImage = async (file) => {
  // 1. get signature
  const sigRes = await API.get("/cloudinary/signature", {
    withCredentials: true,
  });

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
    },
  );

  if (!uploadRes.ok) {
    throw new Error("Image upload failed");
  }

  const data = await uploadRes.json();
  return data.secure_url;
};

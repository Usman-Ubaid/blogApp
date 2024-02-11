import axios from "axios";

export const uploadImageToServerApi = async (formData: FormData) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/blog/upload",
      formData
    );
    console.log("Image uploaded successfully");
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    return;
  }
};

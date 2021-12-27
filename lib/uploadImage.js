import axios from "axios";

// Cloudinary API lang para sa upload

export default async function uploadImage(image) {
  try {
    const formData = new FormData();

    // image file under image input
    formData.append("file", image);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const upload = await axios
      .post("https://api.cloudinary.com/v1_1/sitickets/image/upload", formData)
      .then((res) => res.data);

    // return response from cloudinary
    return upload;
  } catch (error) {
    console.log(error);
  }
}

import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";

interface ImageUploadProps {
  onChange: (url: string) => void;
}

const ImageUpload = ({ onChange }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    console.log("File selected:", file); // Debugging
    if (!file) {
      alert("Please select an image file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pskbaxbg");
    formData.append("cloud_name", "dudkmza2y");

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dudkmza2y/image/upload",
        formData
      );
      const uploadedImageUrl = response.data.secure_url;
      console.log("Uploaded image URL:", uploadedImageUrl); // Debugging
      setImageUrl(uploadedImageUrl);
      onChange(uploadedImageUrl); // Pass to parent
    } catch (err) {
      console.error("Upload error:", err);
      setError("Error uploading image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // console.log(imageUrl)

  return (
    <div>
      <FormItem>
        <FormLabel className="text-base font-semibold">Upload Image</FormLabel>
        <FormControl>
          <label className="flex flex-col items-center justify-center w-full h-full px-14 py-8 bg-accent rounded-3xl border-2 border-dashed border-gray-400 shadow-lg hover:bg-gray-200 cursor-pointer transition-all duration-300">
            <svg
              viewBox="0 0 640 512"
              height="50"
              fill="currentColor"
              className="mb-5 text-primary"
            >
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
            </svg>
            <p className="text-gray-500 text-sm font-semibold">Drag and Drop</p>
            <p className="text-gray-500 text-sm font-semibold">or</p>
            <span className="bg-primary text-white py-1 mt-3 px-4 rounded-md text-sm hover:bg-blue-700">
              Browse file
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {loading && (
              <p className="flex items-center">
                Uploading... wait for a moment
                <LoaderCircle className="animate-spin" />
              </p>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded Image"
                className="mt-5 w-20 h-20"
              />
            )}
          </label>
        </FormControl>
        <FormMessage />
      </FormItem>
    </div>
  );
};

export default ImageUpload;

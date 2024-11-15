import React, { useState, useEffect } from "react";
import { Image } from "../types/Presentation";

interface EditImageModalProps {
  onClose: () => void;
  onUpdateImage: (image: Image) => void;
  image: Image;
}

const EditImageModal: React.FC<EditImageModalProps> = ({
  onClose,
  onUpdateImage,
  image,
}) => {
  const [width, setWidth] = useState<number | string>(image.width);
  const [height, setHeight] = useState<number | string>(image.height);
  const [url, setUrl] = useState<string>(image.url);
  const [alt, setAlt] = useState<string>(image.alt);
  const [x, setX] = useState<number | string>(image.x);
  const [y, setY] = useState<number | string>(image.y);

  useEffect(() => {
    setWidth(image.width);
    setHeight(image.height);
    setUrl(image.url);
    setAlt(image.alt);
    setX(image.x);
    setY(image.y);
  }, [image]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateImage = () => {
    const updatedImage: Image = {
      width: width ? Number(width) : 50,
      height: height ? Number(height) : 50,
      url: url || "",
      alt: alt || "Image",
      x: Number(x),
      y: Number(y),
    };
    onUpdateImage(updatedImage);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Image</h2>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Width (%)
          </label>
          <input
            type="number"
            placeholder="50"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Height (%)
          </label>
          <input
            type="number"
            placeholder="50"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            placeholder="Enter image URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Or Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Alt Text
          </label>
          <input
            type="text"
            placeholder="Enter alt text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            X Position (%)
          </label>
          <input
            type="number"
            placeholder="0"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Y Position (%)
          </label>
          <input
            type="number"
            placeholder="0"
            value={y}
            onChange={(e) => setY(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          onClick={handleUpdateImage}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mr-2"
        >
          Update
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditImageModal;

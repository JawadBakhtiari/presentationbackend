import React, { useState } from "react";
import { Presentation } from "../types/Presentation";

interface NewPresentationModalProps {
  onClose: () => void;
  onCreate: (presentation: Omit<Presentation, "id" | "slides">) => void;
}

const NewPresentationModal: React.FC<NewPresentationModalProps> = ({
  onClose,
  onCreate,
}) => {
  const [newPresentation, setNewPresentation] = useState({
    name: "",
    description: "",
    thumbnail: "",
  });

  const handleCreate = () => {
    onCreate(newPresentation);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPresentation({
          ...newPresentation,
          thumbnail: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New Presentation</h2>
        <input
          type="text"
          placeholder="Project Name"
          value={newPresentation.name}
          onChange={(e) =>
            setNewPresentation({ ...newPresentation, name: e.target.value })
          }
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={newPresentation.description}
          onChange={(e) =>
            setNewPresentation({
              ...newPresentation,
              description: e.target.value,
            })
          }
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={newPresentation.thumbnail}
          onChange={(e) =>
            setNewPresentation({
              ...newPresentation,
              thumbnail: e.target.value,
            })
          }
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Or Upload Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mr-2"
        >
          Create
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

export default NewPresentationModal;

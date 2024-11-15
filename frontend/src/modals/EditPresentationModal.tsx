import React, { useState } from "react";
import { Presentation } from "../types/Presentation";

interface EditPresentationModalProps {
  presentation: Presentation;
  onClose: () => void;
  onUpdate: (updatedPresentation: Presentation) => void;
}

const EditPresentationModal: React.FC<EditPresentationModalProps> = ({
  presentation,
  onClose,
  onUpdate,
}) => {
  const [updatedPresentation, setUpdatedPresentation] = useState(presentation);

  const handleUpdate = () => {
    onUpdate(updatedPresentation);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedPresentation({
          ...updatedPresentation,
          thumbnail: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4">Edit Presentation</h2>
        <input
          type="text"
          placeholder="Name"
          value={updatedPresentation.name}
          onChange={(e) =>
            setUpdatedPresentation({
              ...updatedPresentation,
              name: e.target.value,
            })
          }
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={updatedPresentation.description}
          onChange={(e) =>
            setUpdatedPresentation({
              ...updatedPresentation,
              description: e.target.value,
            })
          }
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={handleUpdate}
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

export default EditPresentationModal;

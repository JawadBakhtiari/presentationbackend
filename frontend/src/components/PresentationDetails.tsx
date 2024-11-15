import React from "react";
import pencilIcon from "../assets/pencil.svg";
import deleteIcon from "../assets/delete.svg";
import { Presentation } from "../types/Presentation";

interface PresentationDetailsProps {
  presentation: Presentation;
  onEdit: () => void;
  onDelete: () => void;
}

const PresentationDetails: React.FC<PresentationDetailsProps> = ({
  presentation,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-center mt-10 w-full">
      {presentation.thumbnail && (
        <img
          src={presentation.thumbnail}
          alt="Thumbnail"
          className="w-12 h-12 object-cover rounded"
        />
      )}
      <h1 className="text-xl font-bold ml-4 mr-4 underline underline-offset-8 decoration-gray-300">
        {presentation.name}
      </h1>
      <div className="flex items-center">
        <img
          src={pencilIcon}
          alt="Edit"
          className="w-8 h-8 cursor-pointer mr-4 hover:border-2 hover:border-orange-300 hover:rounded-md"
          onClick={onEdit}
        />
        <img
          src={deleteIcon}
          alt="Delete"
          className="w-8 h-8 cursor-pointer hover:border-2 hover:border-orange-300 hover:rounded-md"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default PresentationDetails;

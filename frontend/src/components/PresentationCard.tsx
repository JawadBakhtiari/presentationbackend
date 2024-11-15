import React from "react";
import { Presentation } from "../types/Presentation";
import pencilIcon from "../assets/pencil.svg"; // Import pencil icon

interface PresentationCardProps {
  presentation: Presentation;
  onClick: () => void;
  onEdit: () => void; // Add onEdit prop
}

const PresentationCard: React.FC<PresentationCardProps> = ({
  presentation,
  onClick,
  onEdit,
}) => {
  return (
    <div
      className="presentation-card bg-white p-4 rounded shadow-md flex flex-col justify-between relative hover:shadow-lg hover:shadow-blue-500 transition duration-200 cursor-pointer"
      onClick={onClick}
      style={{
        width: "100%",
        maxWidth: "300px",
        height: "150px",
        aspectRatio: "2 / 1",
      }}
    >
      <div className="flex justify-between items-start">
        <h3
          className="text-sm font-bold leading-tight mb-2"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {presentation.name}
        </h3>
        <div className="relative">
          <img
            src={pencilIcon}
            alt="Edit"
            className="w-5 h-5 text-gray-500 cursor-pointer hover:border-2 hover:border-orange-300 hover:rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          />
        </div>
      </div>
      <div className="flex flex-grow justify-between">
        <div className="flex-grow overflow-hidden">
          <p
            className="text-sm text-gray-600"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {presentation.description || "No description"}
          </p>
        </div>
        <div className="border-l border-gray-300 ml-4 pl-4 flex items-center justify-center">
          <div
            className="thumbnail bg-gray-300"
            style={{
              width: "60px",
              height: "60px",
              backgroundImage: presentation.thumbnail
                ? `url(${presentation.thumbnail})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
      <p className="text-sm text-gray-600 absolute bottom-2 left-4">
        Slides: {presentation.slides.length}
      </p>
    </div>
  );
};

export default PresentationCard;

import React from "react";
import { useControls } from "react-zoom-pan-pinch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchPlus,
  faSearchMinus,
  faUndo,
  faTrash,
  faArrowLeft,
  faArrowRight,
  faTextHeight,
  faImage,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

interface ControlsProps {
  onPreviousSlide: () => void;
  onNextSlide: () => void;
  onDeleteSlide: () => void;
  onAddTextBox: () => void;
  onAddImage: () => void;
  onAddVideo: () => void;
  currentIndex: number;
  totalSlides: number;
}

const Controls: React.FC<ControlsProps> = ({
  onPreviousSlide,
  onNextSlide,
  onDeleteSlide,
  onAddTextBox,
  onAddImage,
  onAddVideo,
  currentIndex,
  totalSlides,
}) => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="tools flex flex-col space-y-2">
      <div className="flex space-x-2">
        <button
          onClick={onPreviousSlide}
          className={`p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md ${
            currentIndex === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500"
          }`}
          disabled={currentIndex === 0}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button onClick={() => zoomIn()} className="p-2 bg-gray-200 rounded">
          <FontAwesomeIcon icon={faSearchPlus} />
        </button>
        <button onClick={() => zoomOut()} className="p-2 bg-gray-200 rounded">
          <FontAwesomeIcon icon={faSearchMinus} />
        </button>
        <button
          onClick={() => resetTransform()}
          className="p-2 bg-gray-200 rounded"
        >
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <button
          onClick={onNextSlide}
          className={`p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md ${
            currentIndex === totalSlides - 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500"
          }`}
          disabled={currentIndex === totalSlides - 1}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <div className="flex justify-center space-x-2">
        <button onClick={onAddTextBox} className="p-2 bg-green-500 rounded">
          <FontAwesomeIcon icon={faTextHeight} />
        </button>
        <button onClick={onAddImage} className="p-2 bg-blue-500 rounded">
          <FontAwesomeIcon icon={faImage} />
        </button>
        <button onClick={onAddVideo} className="p-2 bg-red-500 rounded">
          <FontAwesomeIcon icon={faVideo} />
        </button>
        <button onClick={onDeleteSlide} className="p-2 bg-red-500 rounded">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default Controls;

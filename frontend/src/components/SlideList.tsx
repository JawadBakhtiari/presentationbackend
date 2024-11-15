import React from "react";
import { Slide } from "../types/Presentation";
import SlidePreview from "./SliderPreview";

interface SlideListProps {
  slides: Slide[];
  onAddSlide: () => void;
  onSelectSlide: (slide: Slide) => void;
  currentIndex: number;
}

const SlideList: React.FC<SlideListProps> = ({
  slides,
  onAddSlide,
  onSelectSlide,
  currentIndex,
}) => {
  return (
    <div className="relative w-full">
      <div className="fixed bottom-0 left-0 right-0 flex overflow-x-auto p-2 bg-white">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`flex-shrink-0 w-32 h-24 m-2 border border-gray-300 rounded shadow-md cursor-pointer ${
              index === currentIndex ? "border-blue-500 bg-blue-100" : ""
            }`}
            style={{
              boxShadow:
                index === currentIndex
                  ? "1px 4px 8px rgba(0, 0, 255, 0.5)"
                  : "",
            }}
            onClick={() => onSelectSlide(slide)}
          >
            <SlidePreview slide={slide} />
          </div>
        ))}
        <button
          onClick={onAddSlide}
          className="flex-shrink-0 w-32 h-24 m-2 border border-gray-300 rounded shadow-md flex items-center justify-center text-gray-600 bg-gray-200"
        >
          + New Slide
        </button>
      </div>
    </div>
  );
};

export default SlideList;

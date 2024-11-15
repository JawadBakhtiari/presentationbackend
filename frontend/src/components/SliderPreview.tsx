import React from "react";
import { Slide } from "../types/Presentation";

interface SlidePreviewProps {
  slide: Slide;
}

const SlidePreview: React.FC<SlidePreviewProps> = ({ slide }) => {
  const scaleFactor = 0.1;

  return (
    <div className="relative w-32 h-24 border border-gray-300 rounded shadow-md bg-white">
      {slide.textBoxes?.map((textBox, index) => (
        <div
          key={index}
          style={{
            width: `${textBox.width}%`,
            height: `${textBox.height}%`,
            fontSize: `${textBox.fontSize * scaleFactor}em`,
            color: textBox.color,
            border: "1px solid #ccc",
            position: "absolute",
            top: `${textBox.y}%`,
            left: `${textBox.x}%`,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "pre-wrap",
            zIndex: index + 1, // Ensure the latest element is on top
          }}
        >
          {textBox.text}
        </div>
      ))}
      {slide.images?.map((image, index) => (
        <div
          key={index}
          style={{
            width: `${image.width}%`,
            height: `${image.height}%`,
            position: "absolute",
            top: `${image.y}%`,
            left: `${image.x}%`,
            border: "1px solid #ccc",
            overflow: "hidden",
            zIndex: index + 1, // Ensure the latest element is on top
          }}
        >
          <img
            src={image.url}
            alt={image.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ensure the image covers the specified area
            }}
          />
        </div>
      ))}
      {slide.videos?.map((video, index) => (
        <div
          key={index}
          style={{
            width: `${video.width}%`,
            height: `${video.height}%`,
            position: "absolute",
            top: `${video.y}%`,
            left: `${video.x}%`,
            border: "1px solid #ccc",
            overflow: "hidden",
            zIndex: index + 1, // Ensure the latest element is on top
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={video.url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default SlidePreview;

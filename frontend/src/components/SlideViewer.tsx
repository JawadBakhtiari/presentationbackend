import React from "react";
import { Slide, TextBox, Image, Video } from "../types/Presentation";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Controls from "./Controls";

interface SlideViewerProps {
  slide: Slide;
  onPreviousSlide: () => void;
  onNextSlide: () => void;
  onDeleteSlide: () => void;
  onAddTextBox: () => void;
  onEditTextBox: (textBox: TextBox) => void;
  onDeleteTextBox: (textBox: TextBox) => void;
  onAddImage: () => void;
  onEditImage: (image: Image) => void;
  onDeleteImage: (image: Image) => void;
  onAddVideo: () => void;
  onEditVideo: (video: Video) => void;
  onDeleteVideo: (video: Video) => void;
  currentIndex: number;
  totalSlides: number;
}

const SlideViewer: React.FC<SlideViewerProps> = ({
  slide,
  onPreviousSlide,
  onNextSlide,
  onDeleteSlide,
  onAddTextBox,
  onEditTextBox,
  onDeleteTextBox,
  onAddImage,
  onEditImage,
  onDeleteImage,
  onAddVideo,
  onEditVideo,
  onDeleteVideo,
  currentIndex,
  totalSlides,
}) => {
  return (
    <div className="flex flex-col w-full items-center p-4 border border-gray-300">
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        wheel={{ step: 0.1 }}
        minScale={0.1}
        maxScale={3}
        doubleClick={{ disabled: true }} // Disable double-click zooming
      >
        <>
          <TransformComponent>
            <div className="relative w-96 h-72 flex items-center justify-center bg-white border border-gray-400 rounded shadow-md mb-2">
              {slide.textBoxes?.map((textBox, index) => (
                <div
                  key={index}
                  style={{
                    width: `${textBox.width}%`,
                    height: `${textBox.height}%`,
                    fontSize: `${textBox.fontSize}em`,
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
                  onDoubleClick={(event) => {
                    event.stopPropagation();
                    onEditTextBox(textBox);
                  }}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    onDeleteTextBox(textBox);
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
                    zIndex: index + 1,
                  }}
                  onDoubleClick={(event) => {
                    event.stopPropagation();
                    onEditImage(image);
                  }}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    onDeleteImage(image);
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    loading="lazy" // Use lazy loading
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
                    zIndex: index + 1,
                  }}
                  onDoubleClick={(event) => {
                    event.stopPropagation();
                    onEditVideo(video);
                  }}
                  onContextMenu={(event) => {
                    event.preventDefault();
                    onDeleteVideo(video);
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "10px solid gray",
                      boxSizing: "border-box",
                    }}
                    onDoubleClick={(event) => {
                      event.stopPropagation();
                      onEditVideo(video);
                    }}
                    onContextMenu={(event) => {
                      event.preventDefault();
                      onDeleteVideo(video);
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
                      style={{ pointerEvents: "auto" }} // Allow the iframe to capture click events
                    ></iframe>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-2 left-2 w-12 h-12 flex items-center justify-center text-sm text-gray-600 bg-white border border-gray-300 rounded-full">
                {currentIndex + 1}
              </div>
            </div>
          </TransformComponent>
          <Controls
            onPreviousSlide={onPreviousSlide}
            onNextSlide={onNextSlide}
            onDeleteSlide={onDeleteSlide}
            onAddTextBox={onAddTextBox}
            onAddImage={onAddImage}
            onAddVideo={onAddVideo}
            currentIndex={currentIndex}
            totalSlides={totalSlides}
          />
        </>
      </TransformWrapper>
    </div>
  );
};

export default SlideViewer;

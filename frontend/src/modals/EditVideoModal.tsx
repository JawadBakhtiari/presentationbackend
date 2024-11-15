import React, { useState, useEffect } from "react";
import { Video } from "../types/Presentation";

interface EditVideoModalProps {
  onClose: () => void;
  onUpdateVideo: (video: Video) => void;
  video: Video;
}

const EditVideoModal: React.FC<EditVideoModalProps> = ({
  onClose,
  onUpdateVideo,
  video,
}) => {
  const [width, setWidth] = useState<number | string>(video.width);
  const [height, setHeight] = useState<number | string>(video.height);
  const [url, setUrl] = useState<string>(video.url);
  const [autoPlay, setAutoPlay] = useState<boolean>(video.autoPlay);
  const [x, setX] = useState<number | string>(video.x);
  const [y, setY] = useState<number | string>(video.y);

  useEffect(() => {
    setWidth(video.width);
    setHeight(video.height);
    setUrl(video.url);
    setAutoPlay(video.autoPlay);
    setX(video.x);
    setY(video.y);
  }, [video]);

  const handleUpdateVideo = () => {
    const updatedVideo: Video = {
      width: width ? Number(width) : 50,
      height: height ? Number(height) : 50,
      url: url || "",
      autoPlay: autoPlay,
      x: Number(x),
      y: Number(y),
    };
    onUpdateVideo(updatedVideo);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Video</h2>
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
            Video URL
          </label>
          <input
            type="text"
            placeholder="Enter video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Auto-Play
          </label>
          <input
            type="checkbox"
            checked={autoPlay}
            onChange={(e) => setAutoPlay(e.target.checked)}
            className="p-2 border border-gray-300 rounded"
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
          onClick={handleUpdateVideo}
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

export default EditVideoModal;

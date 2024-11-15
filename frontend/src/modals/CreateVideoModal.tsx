import React, { useState } from "react";
import { Video } from "../types/Presentation";

interface CreateVideoModalProps {
  onClose: () => void;
  onAddVideo: (video: Video) => void;
}

const CreateVideoModal: React.FC<CreateVideoModalProps> = ({
  onClose,
  onAddVideo,
}) => {
  const [width, setWidth] = useState<number | string>("");
  const [height, setHeight] = useState<number | string>("");
  const [url, setUrl] = useState<string>("");
  const [autoPlay, setAutoPlay] = useState<boolean>(false);

  const handleAddVideo = () => {
    const newVideo: Video = {
      width: width ? Number(width) : 50,
      height: height ? Number(height) : 50,
      url: url || "",
      autoPlay: autoPlay,
      x: 0, // Default position
      y: 0, // Default position
    };
    onAddVideo(newVideo);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Video</h2>
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
        <button
          onClick={handleAddVideo}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mr-2"
        >
          Add
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

export default CreateVideoModal;

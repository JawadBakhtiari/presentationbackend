import React, { useState } from "react";
import { TextBox } from "../types/Presentation";

interface CreateTextBoxModalProps {
  onClose: () => void;
  onAddTextBox: (textBox: TextBox) => void;
}

const CreateTextBoxModal: React.FC<CreateTextBoxModalProps> = ({
  onClose,
  onAddTextBox,
}) => {
  const [width, setWidth] = useState<number | string>("");
  const [height, setHeight] = useState<number | string>("");
  const [text, setText] = useState<string>("");
  const [fontSize, setFontSize] = useState<number | string>("");
  const [color, setColor] = useState<string>("#000000");

  const handleAddTextBox = () => {
    const newTextBox: TextBox = {
      width: width ? Number(width) : 50,
      height: height ? Number(height) : 50,
      text: text || "Default Text",
      fontSize: fontSize ? Number(fontSize) : 1,
      color: color || "#000000",
      x: 0,
      y: 0,
    };
    onAddTextBox(newTextBox);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Text Box</h2>
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
            Text
          </label>
          <textarea
            placeholder="Enter your text here"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Font Size (em)
          </label>
          <input
            type="number"
            placeholder="1"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Font Color
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            style={{ borderColor: color }}
          />
        </div>
        <button
          onClick={handleAddTextBox}
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

export default CreateTextBoxModal;

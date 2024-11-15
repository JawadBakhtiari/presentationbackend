import React, { useState, useEffect } from "react";
import { TextBox } from "../types/Presentation";

interface EditTextBoxModalProps {
  onClose: () => void;
  onUpdateTextBox: (textBox: TextBox) => void;
  textBox: TextBox;
}

const EditTextBoxModal: React.FC<EditTextBoxModalProps> = ({
  onClose,
  onUpdateTextBox,
  textBox,
}) => {
  const [width, setWidth] = useState<number | string>(textBox.width);
  const [height, setHeight] = useState<number | string>(textBox.height);
  const [text, setText] = useState<string>(textBox.text);
  const [fontSize, setFontSize] = useState<number | string>(textBox.fontSize);
  const [color, setColor] = useState<string>(textBox.color);
  const [x, setX] = useState<number | string>(textBox.x);
  const [y, setY] = useState<number | string>(textBox.y);

  useEffect(() => {
    setWidth(textBox.width);
    setHeight(textBox.height);
    setText(textBox.text);
    setFontSize(textBox.fontSize);
    setColor(textBox.color);
    setX(textBox.x);
    setY(textBox.y);
  }, [textBox]);

  const handleUpdateTextBox = () => {
    const updatedTextBox: TextBox = {
      width: width ? Number(width) : 50,
      height: height ? Number(height) : 50,
      text: text || "Default Text",
      fontSize: fontSize ? Number(fontSize) : 1,
      color: color || "#000000",
      x: Number(x),
      y: Number(y),
    };
    onUpdateTextBox(updatedTextBox);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Text Box</h2>
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
          onClick={handleUpdateTextBox}
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

export default EditTextBoxModal;

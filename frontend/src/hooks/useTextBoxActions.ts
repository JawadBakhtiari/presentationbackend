import { useState } from "react";
import { TextBox, Slide } from "../types/Presentation";

const useTextBoxActions = (
  selectedSlide: Slide | null,
  updateSlide: (slide: Slide) => void
) => {
  const [editingTextBox, setEditingTextBox] = useState<TextBox | null>(null);
  const [showTextBoxModal, setShowTextBoxModal] = useState(false);

  const handleAddTextBox = (textBox: TextBox) => {
    if (selectedSlide) {
      const updatedSlide = {
        ...selectedSlide,
        textBoxes: [...(selectedSlide.textBoxes || []), textBox],
      };
      updateSlide(updatedSlide);
      setShowTextBoxModal(false);
    }
  };

  const handleEditTextBox = (textBox: TextBox | null) => {
    setEditingTextBox(textBox);
    setShowTextBoxModal(true);
  };

  const handleUpdateTextBox = (updatedTextBox: TextBox) => {
    if (selectedSlide) {
      const updatedSlide = {
        ...selectedSlide,
        textBoxes: selectedSlide.textBoxes?.map((tb) =>
          tb === editingTextBox ? updatedTextBox : tb
        ),
      };
      updateSlide(updatedSlide);
      setEditingTextBox(null);
      setShowTextBoxModal(false);
    }
  };

  const handleDeleteTextBox = (textBox: TextBox) => {
    if (selectedSlide) {
      const updatedSlide = {
        ...selectedSlide,
        textBoxes: selectedSlide.textBoxes?.filter((tb) => tb !== textBox),
      };
      updateSlide(updatedSlide);
    }
  };

  return {
    editingTextBox,
    showTextBoxModal,
    setShowTextBoxModal,
    handleAddTextBox,
    handleEditTextBox,
    handleUpdateTextBox,
    handleDeleteTextBox,
  };
};

export default useTextBoxActions;

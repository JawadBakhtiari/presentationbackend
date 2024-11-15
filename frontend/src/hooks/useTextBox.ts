import { useState } from "react";
import { Slide, Presentation, TextBox } from "../types/Presentation";

const useTextBox = (
  presentation: Presentation | null,
  selectedSlide: Slide | null,
  updatePresentation: (presentation: Presentation) => void,
  updateSlide: (slide: Slide) => void
) => {
  const [showTextBoxModal, setShowTextBoxModal] = useState(false);

  const handleAddTextBox = (textBox: TextBox) => {
    if (selectedSlide && presentation) {
      const updatedSlide = {
        ...selectedSlide,
        textBoxes: [...(selectedSlide.textBoxes || []), textBox],
      };
      updateSlide(updatedSlide);
      const updatedPresentation = {
        ...presentation,
        slides: presentation.slides.map((slide) =>
          slide.id === selectedSlide.id ? updatedSlide : slide
        ),
      };
      updatePresentation(updatedPresentation);
    }
  };

  return {
    showTextBoxModal,
    setShowTextBoxModal,
    handleAddTextBox,
  };
};

export default useTextBox;

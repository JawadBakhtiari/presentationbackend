import { useState } from "react";
import { Image, Slide } from "../types/Presentation";

const useImageActions = (
  selectedSlide: Slide | null,
  updateSlide: (slide: Slide) => void
) => {
  const [editingImage, setEditingImage] = useState<Image | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleAddImage = (image: Image) => {
    if (selectedSlide) {
      const updatedSlide = {
        ...selectedSlide,
        images: [...(selectedSlide.images || []), image],
      };
      updateSlide(updatedSlide);
      setShowImageModal(false);
    }
  };

  const handleEditImage = (image: Image | null) => {
    setEditingImage(image);
    setShowImageModal(true);
  };

  const handleUpdateImage = (updatedImage: Image) => {
    if (selectedSlide) {
      const updatedSlide = {
        ...selectedSlide,
        images: selectedSlide.images?.map((img) =>
          img === editingImage ? updatedImage : img
        ),
      };
      updateSlide(updatedSlide);
      setEditingImage(null);
      setShowImageModal(false);
    }
  };

  const handleDeleteImage = (image: Image) => {
    if (selectedSlide) {
      const updatedSlide = {
        ...selectedSlide,
        images: selectedSlide.images?.filter((img) => img !== image),
      };
      updateSlide(updatedSlide);
    }
  };

  return {
    editingImage,
    showImageModal,
    setShowImageModal,
    handleAddImage,
    handleEditImage,
    handleUpdateImage,
    handleDeleteImage,
  };
};

export default useImageActions;

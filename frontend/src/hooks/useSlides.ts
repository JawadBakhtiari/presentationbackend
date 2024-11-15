import { useState, useEffect } from "react";
import { Slide, Presentation } from "../types/Presentation";

const useSlides = (
  presentation: Presentation | null,
  updatePresentation: (presentation: Presentation) => void
) => {
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInitialSetupDone, setIsInitialSetupDone] = useState(false);

  useEffect(() => {
    if (!isInitialSetupDone && presentation && presentation.slides.length > 0) {
      setSelectedSlide(presentation.slides[0]);
      setCurrentIndex(0);
      setIsInitialSetupDone(true);
    }
  }, [presentation, isInitialSetupDone]);

  const addSlide = (
    updatePresentation: (presentation: Presentation) => void
  ) => {
    if (presentation) {
      const newSlide: Slide = {
        id: presentation.slides.length + 1,
        content: "",
        textBoxes: [],
        images: [],
        videos: [],
      };
      const updatedPresentation = {
        ...presentation,
        slides: [...presentation.slides, newSlide],
      };
      updatePresentation(updatedPresentation);
      setSelectedSlide(newSlide);
      setCurrentIndex(updatedPresentation.slides.length - 1);
    }
  };

  const selectSlide = (slide: Slide) => {
    const index = presentation?.slides.findIndex((s) => s.id === slide.id) ?? 0;
    setCurrentIndex(index);
    setSelectedSlide(slide);
  };

  const previousSlide = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedSlide(presentation?.slides[newIndex] || null);
    }
  };

  const nextSlide = () => {
    if (currentIndex < (presentation?.slides.length || 0) - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedSlide(presentation?.slides[newIndex] || null);
    }
  };

  const deleteSlide = (
    updatePresentation: (presentation: Presentation) => void,
    setShowDeleteConfirmationModal: (show: boolean) => void
  ) => {
    if (presentation && presentation.slides.length > 1) {
      const updatedSlides = presentation.slides.filter(
        (_, index) => index !== currentIndex
      );
      const updatedPresentation = {
        ...presentation,
        slides: updatedSlides,
      };
      updatePresentation(updatedPresentation);

      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setSelectedSlide(updatedSlides[currentIndex - 1]);
      } else {
        setCurrentIndex(0);
        setSelectedSlide(updatedSlides[0]);
      }
    } else {
      setShowDeleteConfirmationModal(true);
    }
  };

  const updateSlide = (updatedSlide: Slide) => {
    if (presentation) {
      const updatedSlides = presentation.slides.map((slide) =>
        slide.id === updatedSlide.id ? updatedSlide : slide
      );
      const updatedPresentation = {
        ...presentation,
        slides: updatedSlides,
      };
      setSelectedSlide(updatedSlide);
      updatePresentation(updatedPresentation);
    }
  };

  return {
    selectedSlide,
    currentIndex,
    addSlide,
    selectSlide,
    previousSlide,
    nextSlide,
    deleteSlide,
    updateSlide,
  };
};

export default useSlides;

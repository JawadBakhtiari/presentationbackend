import { useState } from "react";
import { Video, Slide } from "../types/Presentation";

const useVideoActions = (
  selectedSlide: Slide | null,
  updateSlide: (slide: Slide) => void
) => {
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleAddVideo = (video: Video) => {
    if (selectedSlide) {
      const updatedSlide = {
        ...selectedSlide,
        videos: [...(selectedSlide.videos || []), video],
      };
      updateSlide(updatedSlide);
      setShowVideoModal(false);
    }
  };

  const handleEditVideo = (video: Video | null) => {
    setEditingVideo(video);
    setShowVideoModal(true);
  };

  const handleUpdateVideo = (updatedVideo: Video) => {
    if (selectedSlide) {
      const updatedSlide = {
        ...selectedSlide,
        videos: selectedSlide.videos?.map((vid) =>
          vid === editingVideo ? updatedVideo : vid
        ),
      };
      updateSlide(updatedSlide);
      setEditingVideo(null);
      setShowVideoModal(false);
    }
  };

  const handleDeleteVideo = (video: Video) => {
    if (selectedSlide) {
      const updatedSlide = {
        ...selectedSlide,
        videos: selectedSlide.videos?.filter((vid) => vid !== video),
      };
      updateSlide(updatedSlide);
    }
  };

  return {
    editingVideo,
    showVideoModal,
    setShowVideoModal,
    handleAddVideo,
    handleEditVideo,
    handleUpdateVideo,
    handleDeleteVideo,
  };
};

export default useVideoActions;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutConfirmationModal from "../modals/LogoutConfirmationModal";
import EditPresentationModal from "../modals/EditPresentationModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import CreateTextBoxModal from "../modals/CreateTextBoxModal";
import EditTextBoxModal from "../modals/EditTextBoxModal";
import CreateImageModal from "../modals/CreateImageModal";
import EditImageModal from "../modals/EditImageModal";
import CreateVideoModal from "../modals/CreateVideoModal";
import EditVideoModal from "../modals/EditVideoModal";
import BackButton from "../components/BackButton";
import LogoutButton from "../components/LogoutButton";
import PresentationDetails from "../components/PresentationDetails";
import SlideList from "../components/SlideList";
import SlideViewer from "../components/SlideViewer";
import usePresentation from "../hooks/usePresentation";
import useSlides from "../hooks/useSlides";
import useTextBoxActions from "../hooks/useTextBoxActions";
import useImageActions from "../hooks/useImageActions";
import useVideoActions from "../hooks/useVideoActions";
import useKeyboardNavigation from "../hooks/useKeyboardNavigation";
// import { TextBox, Image, Video } from "../types/Presentation";

const PresentationPage: React.FC = () => {
  const navigate = useNavigate();
  const { presentation, updatePresentation, deletePresentation } =
    usePresentation();
  const {
    selectedSlide,
    currentIndex,
    addSlide,
    selectSlide,
    previousSlide,
    nextSlide,
    deleteSlide,
    updateSlide,
  } = useSlides(presentation, updatePresentation);

  const {
    editingTextBox,
    showTextBoxModal,
    setShowTextBoxModal,
    handleAddTextBox,
    handleEditTextBox,
    handleUpdateTextBox,
    handleDeleteTextBox,
  } = useTextBoxActions(selectedSlide, updateSlide);

  const {
    editingImage,
    showImageModal,
    setShowImageModal,
    handleAddImage,
    handleEditImage,
    handleUpdateImage,
    handleDeleteImage,
  } = useImageActions(selectedSlide, updateSlide);

  const {
    editingVideo,
    showVideoModal,
    setShowVideoModal,
    handleAddVideo,
    handleEditVideo,
    handleUpdateVideo,
    handleDeleteVideo,
  } = useVideoActions(selectedSlide, updateSlide);

  useKeyboardNavigation(previousSlide, nextSlide);

  const [showLogoutConfirmationModal, setShowLogoutConfirmationModal] =
    useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [showEditPresentationModal, setShowEditPresentationModal] =
    useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDeletePresentation = () => {
    deletePresentation();
    navigate("/dashboard");
  };

  if (!presentation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="w-full sticky top-0 flex justify-between items-center bg-white p-4 shadow-md z-50">
        <BackButton to="/dashboard" />
        <LogoutButton onClick={() => setShowLogoutConfirmationModal(true)} />
        <PresentationDetails
          presentation={presentation}
          onEdit={() => setShowEditPresentationModal(true)}
          onDelete={() => setShowDeleteConfirmationModal(true)}
        />
      </div>
      <div className="min-h-screen flex flex-col items-center">
        {showLogoutConfirmationModal && (
          <LogoutConfirmationModal
            onClose={() => setShowLogoutConfirmationModal(false)}
            onConfirm={handleLogout}
          />
        )}
        {showDeleteConfirmationModal && (
          <DeleteConfirmationModal
            onClose={() => setShowDeleteConfirmationModal(false)}
            onConfirm={handleDeletePresentation}
          />
        )}
        {showEditPresentationModal && (
          <EditPresentationModal
            presentation={presentation}
            onClose={() => setShowEditPresentationModal(false)}
            onUpdate={updatePresentation}
          />
        )}
        {showTextBoxModal && editingTextBox ? (
          <EditTextBoxModal
            onClose={() => setShowTextBoxModal(false)}
            onUpdateTextBox={handleUpdateTextBox}
            textBox={editingTextBox}
          />
        ) : showTextBoxModal && !editingTextBox ? (
          <CreateTextBoxModal
            onClose={() => setShowTextBoxModal(false)}
            onAddTextBox={handleAddTextBox}
          />
        ) : null}
        {showImageModal && editingImage ? (
          <EditImageModal
            onClose={() => setShowImageModal(false)}
            onUpdateImage={handleUpdateImage}
            image={editingImage}
          />
        ) : showImageModal && !editingImage ? (
          <CreateImageModal
            onClose={() => setShowImageModal(false)}
            onAddImage={handleAddImage}
          />
        ) : null}
        {showVideoModal && editingVideo ? (
          <EditVideoModal
            onClose={() => setShowVideoModal(false)}
            onUpdateVideo={handleUpdateVideo}
            video={editingVideo}
          />
        ) : showVideoModal && !editingVideo ? (
          <CreateVideoModal
            onClose={() => setShowVideoModal(false)}
            onAddVideo={handleAddVideo}
          />
        ) : null}
        {selectedSlide && (
          <SlideViewer
            slide={selectedSlide}
            onPreviousSlide={previousSlide}
            onNextSlide={nextSlide}
            onDeleteSlide={() =>
              deleteSlide(updatePresentation, setShowDeleteConfirmationModal)
            }
            onAddTextBox={() => {
              handleEditTextBox(null);
            }}
            onEditTextBox={handleEditTextBox}
            onDeleteTextBox={handleDeleteTextBox}
            onAddImage={() => {
              handleEditImage(null);
            }}
            onEditImage={handleEditImage}
            onDeleteImage={handleDeleteImage}
            onAddVideo={() => {
              handleEditVideo(null);
            }}
            onEditVideo={handleEditVideo}
            onDeleteVideo={handleDeleteVideo}
            currentIndex={currentIndex}
            totalSlides={presentation.slides.length}
          />
        )}
      </div>
      <SlideList
        slides={presentation.slides}
        onAddSlide={() => addSlide(updatePresentation)}
        onSelectSlide={selectSlide}
        currentIndex={currentIndex}
      />
    </div>
  );
};

export default PresentationPage;

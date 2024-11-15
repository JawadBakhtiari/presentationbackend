import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewPresentationModal from '../modals/NewPresentationModal';
import UpdatePresentationModal from '../modals/UpdatePresentationModal';
import LogoutConfirmationModal from '../modals/LogoutConfirmationModal';
import PresentationList from '../components/PresentationList';
import useToken from '../hooks/useGetStore';
import useStore from '../hooks/useStore';
import { Presentation } from '../types/Presentation';
import { Store } from '../types/Store';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const token = useToken();
  const { store, updateStore } = useStore(token);
  const [showNewPresentationModal, setShowNewPresentationModal] = useState(false);
  const [showUpdatePresentationModal, setShowUpdatePresentationModal] = useState<Presentation | null>(null);
  const [showLogoutConfirmationModal, setShowLogoutConfirmationModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleCreatePresentation = (presentation: Omit<Presentation, 'id' | 'slides'>) => {
    if (store) {
      const newStore: Store = { ...store };
      if (!newStore.presentations) {
        newStore.presentations = [];
      }
      newStore.presentations.unshift({
        ...presentation,
        id: newStore.presentations.length + 1,
        slides: [{ id: 1, content: '' }],
      });
      updateStore(newStore);
      setShowNewPresentationModal(false);
    }
  };

  const handleUpdatePresentation = (updatedPresentation: Presentation) => {
    if (store) {
      const newStore: Store = {
        ...store,
        presentations: store.presentations.map(p =>
          p.id === updatedPresentation.id ? updatedPresentation : p
        ),
      };
      updateStore(newStore);
    }
  };

  const handleDeletePresentation = (id: number) => {
    if (store) {
      const newStore: Store = {
        ...store,
        presentations: store.presentations.filter(p => p.id !== id),
      };
      updateStore(newStore);
      setShowUpdatePresentationModal(null);
    }
  };

  const handlePresentationClick = (id: number) => {
    const presentation = store?.presentations.find(p => p.id === id);
    if (presentation) {
      navigate(`/presentation/${presentation.id}`, { state: { presentation } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
      <button
        onClick={() => setShowLogoutConfirmationModal(true)}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
      <h1 className="text-4xl font-bold mb-4 mt-12">Dashboard</h1>
      <button
        onClick={() => setShowNewPresentationModal(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4"
      >
        New Presentation
      </button>
      {showNewPresentationModal && (
        <NewPresentationModal
          onClose={() => setShowNewPresentationModal(false)}
          onCreate={handleCreatePresentation}
        />
      )}
      {showUpdatePresentationModal && (
        <UpdatePresentationModal
          presentation={showUpdatePresentationModal}
          onClose={() => setShowUpdatePresentationModal(null)}
          onUpdate={handleUpdatePresentation}
          onDelete={handleDeletePresentation}
        />
      )}
      {showLogoutConfirmationModal && (
        <LogoutConfirmationModal
          onClose={() => setShowLogoutConfirmationModal(false)}
          onConfirm={handleLogout}
        />
      )}
      {store && store.presentations ? (
        <PresentationList
          presentations={store.presentations}
          onPresentationClick={handlePresentationClick}
          onEditPresentation={presentation => setShowUpdatePresentationModal(presentation)}
        />
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default DashboardPage;
import React from 'react';
import { Presentation } from '../types/Presentation';
import PresentationCard from './PresentationCard';

interface PresentationListProps {
  presentations: Presentation[];
  onPresentationClick: (id: number) => void;
  onEditPresentation: (presentation: Presentation) => void; // Add onEditPresentation prop
}

const PresentationList: React.FC<PresentationListProps> = ({
  presentations,
  onPresentationClick,
  onEditPresentation,
}) => {
  return (
    <div className="presentations-list mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {presentations.map(presentation => (
        <PresentationCard
          key={presentation.id}
          presentation={presentation}
          onClick={() => onPresentationClick(presentation.id)}
          onEdit={() => onEditPresentation(presentation)}
        />
      ))}
    </div>
  );
};

export default PresentationList;
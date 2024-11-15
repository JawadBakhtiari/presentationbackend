import React from "react";
import { useNavigate } from "react-router-dom";
import backArrow from "../assets/back-arrow.svg";

interface BackButtonProps {
  to: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(to)} className="absolute top-4 left-4">
      <img src={backArrow} alt="Back" className="w-6 h-6" />
    </button>
  );
};

export default BackButton;

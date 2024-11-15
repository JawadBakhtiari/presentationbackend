import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useToken from "../hooks/useGetStore";
import useStore from "../hooks/useStore";
import { Presentation } from "../types/Presentation";

const usePresentation = () => {
  const { id } = useParams<{ id: string }>();
  const token = useToken();
  const { store, updateStore } = useStore(token);
  const [presentation, setPresentation] = useState<Presentation | null>(null);

  useEffect(() => {
    const presentationId = id ? parseInt(id) : 0;
    const foundPresentation = store?.presentations.find(
      (p): p is Presentation => p.id === presentationId
    );
    setPresentation(foundPresentation || null);
  }, [id, store]);

  const updatePresentation = (updatedPresentation: Presentation) => {
    if (store) {
      const newStore = {
        ...store,
        presentations: store.presentations.map((p) =>
          p.id === updatedPresentation.id ? updatedPresentation : p
        ),
      };
      updateStore(newStore);
      setPresentation(updatedPresentation);
    }
  };

  const deletePresentation = () => {
    if (store) {
      const newStore = {
        ...store,
        presentations: store.presentations.filter(
          (p): p is Presentation => p.id !== parseInt(id || "0")
        ),
      };
      updateStore(newStore);
    }
  };

  return { presentation, updatePresentation, deletePresentation };
};

export default usePresentation;

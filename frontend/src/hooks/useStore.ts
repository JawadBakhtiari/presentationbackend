import { useState, useEffect } from "react";
import { Store } from "../types/Store";

const useStore = (token: string | null) => {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    if (token) {
      fetch("https://z5470461-presto-be-deploy.vercel.app/store", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data: { store: Store }) => {
          setStore(data.store);
        })
        .catch((error: { message: string }) => {
          alert(error.message);
        });
    }
  }, [token]);

  const updateStore = (newStore: Store) => {
    if (token) {
      fetch("https://z5470461-presto-be-deploy.vercel.app/store", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ store: newStore }),
      })
        .then((response) => response.json())
        .then(() => {
          setStore(newStore);
        })
        .catch((error: { message: string }) => {
          alert(error.message);
        });
    }
  };

  return { store, updateStore };
};

export default useStore;

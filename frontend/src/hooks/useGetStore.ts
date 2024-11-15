import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useGetStore = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      navigate('/');
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  return token;
};

export default useGetStore;

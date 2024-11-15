import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  token: string;
  error?: string;
}

const useLogin = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const login = async (email: string, password: string): Promise<void> => {
    setError("");

    try {
      const response = await fetch(
        "https://z5470461-presto-be-deploy.vercel.app/admin/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data: LoginResponse = (await response.json()) as LoginResponse;

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return { login, error };
};

export default useLogin;

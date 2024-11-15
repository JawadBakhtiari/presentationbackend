import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterResponse {
  token: string;
  error?: string;
}

const useRegister = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const register = async (
    email: string,
    password: string,
    confirmPassword: string,
    name: string
  ): Promise<void> => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "https://z5470461-presto-be-deploy.vercel.app/admin/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name }),
        }
      );

      const data: RegisterResponse =
        (await response.json()) as RegisterResponse;

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
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

  return { register, error };
};

export default useRegister;

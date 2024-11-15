import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import FormInput from "../components/FormInput";
import BackButton from "../components/BackButton";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error } = useLogin();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <BackButton to="/" /> {/* Use 'to' prop to specify the target route */}
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <form
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
      >
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <FormInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
      <div className="mt-4">
        <p className="text-gray-700">
          {"Don't have an account? "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

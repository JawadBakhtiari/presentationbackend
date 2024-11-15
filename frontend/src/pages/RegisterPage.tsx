import React, { useState } from "react";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import FormInput from "../components/FormInput";
import BackButton from "../components/BackButton";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { register, error } = useRegister();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await register(email, password, confirmPassword, name);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <BackButton to="/" /> {/* Use 'to' prop to specify the target route */}
      <h1 className="text-4xl font-bold mb-4">Register</h1>
      <form
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
      >
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <FormInput
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-200"
        >
          Register
        </button>
      </form>
      <div className="mt-4">
        <p className="text-gray-700">
          {"Already have an account? "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useIsLogged } from "../hooks/useIsLogged";
import { getUserToken } from "../fetch";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { isLogged } = useIsLogged("/signup");

  if (isLogged) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function doSignUp(e: any) {
    e.preventDefault();
    // input validations
    if (!email.includes("@")) {
      console.log("Invalid email");
      return;
    } else if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    } else if (password.length < 8) {
      console.log("Password must be at least 8 characters");
      return;
    }

    const tokenData = await getUserToken(email, password);
    if (!tokenData) {
      console.log("Failed to sign up");
    } else {
      localStorage.setItem("token", tokenData.access_token);
      navigate("/");
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={doSignUp}
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            >
              Sign Up
            </button>
            <Link to={"/signin"} className="text-blue-500 hover:text-blue-700">
              Already have an account?
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { isLogged } = useIsLogged("/signin");

  if (isLogged) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function doSignIn(e: any) {
    e.preventDefault();
    const tokenData = await getUserToken(email, password);
    if (!tokenData) {
      console.log("Failed to sign up");
    } else {
      localStorage.setItem("token", tokenData.access_token);
      navigate("/");
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={doSignIn}
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            >
              Sign In
            </button>
            <Link to="/signup" className="text-blue-500 hover:text-blue-700">
              {" "}
              Sign Up
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

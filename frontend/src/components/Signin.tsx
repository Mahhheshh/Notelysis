import { useState } from "react";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function getToken(email: string, password: string) {
    return fetch("/api/auth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        })
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem("token", data.access_token);
            return data.access_token;
        }).catch((error) => console.log(error));
    }

  // eslint-disable-next-line , @typescript-eslint/no-explicit-any
  function doSignUp(e: any) {
    console.log("Sign up");
    e.preventDefault();
    if (!getToken(email, password)) {
        console.log("Failed to sign up");
    } else {
        console.log("Signed up");   
    }
  }

  return (
    <>
      <main className="flex flex-col items-center py-8">
        <div className="w-full max-w-md bg-white p-8 border border-gray-200 rounded-md shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="login-email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="login-email"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="login-password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="login-password"
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              onClick={doSignUp}
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?
            <a href="#" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </main>

      {/* <main className="flex flex-col items-center py-8" id="signup-form">
        <div className="w-full max-w-md bg-white p-8 border border-gray-200 rounded-md shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                        type="email" 
                        id="signup-email" 
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required/>
                </div>
                <div className="mb-4">
                    <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password" 
                        id="signup-password" 
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required/>
                </div>
                <div className="mb-6">
                    <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input 
                        type="password" 
                        id="signup-confirm-password" 
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        required/>
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Sign Up
                </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">Already have an account? 
                <a href="#" className="text-blue-500 hover:underline" onClick={doSignin}>Login</a>
            </p>
        </div> 
    </main> */}
    </>
  );
}

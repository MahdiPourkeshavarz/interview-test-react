import { useNavigate } from "react-router-dom";

import { AuthenticationForm } from "./components/AuthForm/AuthenticationForm";
import toast from "react-hot-toast";
import { useState } from "react";
import { submitUser } from "../../api/submitUser";
import { useStore } from "../../context/store";
import { userData } from "../../types";

export function AuthenticationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUsername } = useStore();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  async function onSubmit(data: userData) {
    setIsLoading(true);
    const isActionSuccessful = await submitUser(data, mode);
    if (isActionSuccessful) {
      toast.success("You have LogedIn", {
        position: "bottom-center",
      });
      setUsername(data.username);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/home");
      }, 1000);
    } else {
      setIsLoading(false);
      toast.error("Error, try again!", {
        position: "bottom-center",
      });
    }
  }

  return (
    <>
      <div
        className="flex min-h-screen bg-cover"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="flex flex-1 items-center justify-center p-8">
          <div
            className={`w-full max-w-md rounded-lg bg-slate-100 p-8 text-black shadow-lg`}
          >
            <header className="mb-6 text-center">
              <h1 className="text-2xl font-bold">Welcome to Quiz Hub</h1>
            </header>
            <section className="form-block h-fit transition-transform duration-500 ease-in-out">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                {mode === "login" ? "Log In" : "Sign Up"}
              </h2>
              <div className="text-center mb-4">
                <span className="text-gray-600">
                  {mode === "login" ? "Don't" : "Already"} have an account?
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={toggleMode}
                  >
                    {"  "}Click here
                  </span>
                  <button
                    className="text-blue-500 ml-1 transition-transform duration-300 transform hover:scale-105"
                    onClick={toggleMode}
                  >
                    &#8594;
                  </button>
                </span>
              </div>
              <AuthenticationForm
                isLoading={isLoading}
                onSubmit={onSubmit}
                mode={mode}
              />
            </section>
          </div>
        </div>
        <div className="hidden flex-1 items-center justify-center p-8 md:flex">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold">Join Us Today!</h2>
            <p className="mt-4 text-xl">And Test Your Knowledge</p>
          </div>
        </div>
      </div>
    </>
  );
}

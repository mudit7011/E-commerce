import React, { useContext, useState } from "react";
import { assets } from "../assets /assets";
import { data, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      let response;
      if (state === "Sign Up") {
        response = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        const { data } = response;

        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/logIn");
        } else toast.error(data.message);
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/logIn", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        onClick={() => {
          navigate("/");
        }}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 curson-pointer"
        alt=""
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login!"}
        </h2>
        <p className="text-sm text-center mb-6">
          {state === "Sign Up"
            ? "Create Your Account"
            : "Login to your Account!"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full  bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                required
                className=" px-4 py-1 rounded-xl bg-transparent outline-none"
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full  bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              type="email"
              placeholder="Email ID"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              className=" px-4 py-1 rounded-xl bg-transparent outline-none"
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full  bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              type="pass"
              placeholder="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              className=" px-4 py-1 rounded-xl bg-transparent outline-none"
            />
          </div>
          <p
            className="mb-3 text-indigo-500 cursor-pointer"
            onClick={() => {
              navigate("/reset-pass");
            }}
          >
            Forgot Password
          </p>
          {state === "Sign Up" ? (
            <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer">
              Sign Up
            </button>
          ) : (
            <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium cursor-pointer">
              Log In
            </button>
          )}
        </form>

        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an Account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Login Here !
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an Account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Sign Up !
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;

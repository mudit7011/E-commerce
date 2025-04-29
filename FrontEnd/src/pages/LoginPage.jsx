import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  //   const handleLogin = async (e) => {
  //     e.preventDefault();
  //     const { email, password } = loginInfo;
  //     if (!email || !password) {
  //       return handleError("email and password are required");
  //     }
  //     try {
  //       const response = await fetch("http://localhost:4000/api/auth/login", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify(loginInfo),
  //       });
  //       const result = await response.json();
  //       const { success, message, name, error } = result;
  //       if (success) {
  //         handleSuccess(message);
  //         // localStorage.setItem("token", jwtToken);
  //         // localStorage.setItem("loggedInUser", name);
  //         setTimeout(() => {
  //           navigate("/emailverification");
  //         }, 1000);
  //       } else if (error) {
  //         const details = error?.details[0].message;
  //         handleError(details);
  //       } else if (!success) {
  //         handleError(message);
  //       }
  //       console.log(result);
  //     } catch (err) {
  //       handleError(err);
  //     }
  //   };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      console.log("Login result:", result);

      if (result.success) {
        const role = result.user?.role;
        // console.log("User role:", role);

        if (!result.user.isVerified) {
            return navigate("/emailverification");
          }

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "seller") {
          navigate("/dashboard");
        } else {
          navigate("/user");
        }
      } else {
        handleError(result.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      handleError("Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email..."
            value={loginInfo.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter your password..."
            value={loginInfo.password}
          />
        </div>
        <p className="text-primary" style={{ cursor: "pointer" }}>
          Forgot Password?
        </p>
        <button type="submit" className="btn btn-success w-100 mb-2">
          Login
        </button>
        <p>
          Don’t have an account? <Link to="/register">Signup</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;

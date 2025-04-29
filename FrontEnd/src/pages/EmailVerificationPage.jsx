import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmailVerificationPage() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = (msg) => toast.success(msg);
  const handleError = (msg) => toast.error(msg);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp) return handleError("OTP is required");
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:4000/api/auth/verify-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ otp }),
      });
  
      const result = await response.json();
      const { success, message } = result;
  
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/addProduct"), 1500);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResending(true);
    try {
      const response = await fetch("http://localhost:4000/api/auth/send-verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ include cookie here too
      });

      const result = await response.json();
      if (result.message) {
        handleSuccess(result.message);
      } else {
        handleError("Failed to resend OTP");
      }
    } catch (err) {
      handleError("Error resending OTP");
    } finally {
      setResending(false);
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/get-user", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
  
        // Check if the user is verified
        if (data.user?.isVerified) {
          // If verified, navigate to the dashboard or addProduct page
          navigate("/dashboard"); // Or change to "/addProduct" based on your app logic
        }
        // if (data.success) {
        //     if (data.user.role === "admin") {
        //       navigate("/admin");
        //     } else if (data.user.role === "seller") {
        //       navigate("/dashboard");
        //     } else {
        //       navigate("/user");
        //     }
        //   }
      } catch (err) {
        console.error("Error checking user verification:", err);
        // Handle potential error fetching user data (e.g., show a message or redirect)
      }
    };
  
    checkUser();
  }, [navigate('/dashboard')]);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="p-4 shadow rounded bg-white" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Email Verification</h3>
        <form onSubmit={handleVerify}>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">Enter OTP</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
        <div className="mt-3 text-center">
          <small>Didn't receive OTP?</small><br />
          <button className="btn btn-link" onClick={handleResendOtp} disabled={resending}>
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default EmailVerificationPage;

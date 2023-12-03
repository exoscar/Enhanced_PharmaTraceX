import React, { useState } from "react";
import "../../public/assets/css/Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
  const backendLoginURL = import.meta.env.VITE_LOGINURL;
  const backendSignUpURL = import.meta.env.VITE_SIGNUPURL;

  const history = useNavigate();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [metamaskID, setMetamaskId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  async function handleSignIn(e) {
    e.preventDefault();
    try {
      await axios
        .post(backendLoginURL, { metamaskID, password })
        .then((res) => {
          if (res.data.status == "success") {
            const token = res.data.token;
            localStorage.setItem("token", token);
            history("/dashboard", { state: { id: metamaskID } });
          }
        })
        .catch((error) => {
          if (error.response) {
            // Display the server's error message for a Bad Request
            alert(error.response.data.message);
          } else {
            console.error("An error occurred:", error);
            alert(
              "An error occurred. Please check the console for more details."
            );
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      await axios
        .post(backendSignUpURL, {
          companyName,
          metamaskID,
          password,
          confirmPassword,
        })
        .then((res) => {
          if (res.data.status == "success") {
            const token = res.data.token;
            localStorage.setItem("token", token);
            history("/dashboard", { state: { id: metamaskID } });
          }
        })
        .catch((error) => {
          if (error.response) {
            // Display the server's error message for a Bad Request
            alert(error.response.data.message);
          } else {
            console.error("An error occurred:", error);
            alert(
              "An error occurred. Please check the console for more details."
            );
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  return (
    <div className="Loginn">
      <div className={`login-container ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="POST" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <label className="warning" id="warning-message-login"></label>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="text"
                  onChange={(e) => {
                    setMetamaskId(e.target.value);
                  }}
                  name="metamaskid"
                  placeholder="Metamask ID"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  name="password"
                  placeholder="Password"
                />
              </div>
              <input
                type="submit"
                onClick={handleSignIn}
                defaultValue="Login"
                className="btn solid"
              />
            </form>

            <form action="POST" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <label className="warning" id="warning-message-signup"></label>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="text"
                  name="CompanyName"
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                  placeholder="Company Name"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-user" />
                <input
                  type="text"
                  name="metamaskid"
                  onChange={(e) => {
                    setMetamaskId(e.target.value);
                  }}
                  placeholder="Metamask ID"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="Confirm Password"
                />
              </div>
              <input
                type="submit"
                onClick={handleSignUp}
                className="btn"
                defaultValue="Sign up"
              />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <div className="logoimg">
                <img src="aspire.png" alt="" />
              </div>
              <h1>PharmaTraceX</h1>
              <p>
                "Unlocking Trust: Your Gateway to Transparent and Secure
                Medications"
              </p>
              <h3>New here ?</h3>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={handleSignUpClick}
              >
                Sign up
              </button>{" "}
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <div className="logoimg">
                <img src="aspire.png" alt="" />
              </div>
              <h1>PharmaTraceX</h1>
              <p>
                "Join the Future: Sign Up for a Transparent and Secure
                Medication Experience"
              </p>
              <h3>One of us ?</h3>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={handleSignInClick}
              >
                Sign in
              </button>
              <a
                href="learnmore.html"
                style={{ color: "whitesmoke", fontSize: "small" }}
              >
                <br />
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;

import React, { useState } from "react";
import "../../public/assets/css/Login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
  const weurl = "http://localhost:5000/auth";

  const history = useNavigate();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [metamaskId, setMetamaskId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  async function handleSignIn(e) {
    e.preventDefault();
    try {
      await axios
        .post(weurl, { metamaskId, password })
        .then((res) => {
          if (res.data == "exists") {
            history("/dashboard", { state: { id: metamaskId } });
          } else if (res.data == "Wrong Password") {
            alert("Wrong Password");
          } else if (res.data == "not exists") {
            alert("User not found");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      await axios
        .post(weurl, {
          companyName,
          metamaskId,
          password,
          confirmPassword,
        })
        .then((res) => {
          if (res.data == "exists") {
            alert("User already exists");
          } else if (res.data == "not exists") {
            history("/dashboard", { state: { id: metamaskId } });
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
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

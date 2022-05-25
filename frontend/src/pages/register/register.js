/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "../../api/axios";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Switch, Route } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "./register.css";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import Products from "./../Products/Products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Home from "./../../components/Home";
import Login from "./../Login/Login";
import { setNestedObjectValues } from "formik";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
const SITE_KEY = "6LetS2UfAAAAAI9d87vH8yfISqeSi5VRoUhraUlW";
function register() {
  const emailRef = useRef();
  const errRef = useRef();
  const userRef = useRef();
  const [passwordShown, setPasswordShown] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setpasswordFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errorMsg, setErrprMsg] = useState("");
  const [success, SetSuccess] = useState(false);
  const [human, setHuman] = useState({
    verify: false,
  });

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    const result = USER_REGEX.test(user);
    // console.log(result);
    // console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    // console.log(result);
    // console.log(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    // console.log(result);
    // console.log(email);
    setValidEmail(result);
  }, [email]);
  useEffect(() => {
    setErrprMsg("");
  }, [user, password, matchPassword]);

  async function registerHandler(e) {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(password);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrprMsg("Invalid Entry");

      return;
    }
    try {
      let res = await axios({
        method: "post",
        url: "http://localhost:8080/register",
        data: {
          email: email,
          password: password,
          name: user,
          confirmpassword: matchPassword,
        },
      });

      SetSuccess(true);
      let data = res.data;
      // console.log(data);

      return data;
    } catch (err) {
      if (!err?.response) {
        setErrprMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrprMsg("Email Already Exist");
      } else {
        setErrprMsg("Registration Failed");
      }
      errRef.current.focus();

      return err.response;
    }
  }

  function onChange(value) {
    setHuman((previousState) => {
      return { ...previousState, verify: true };
    });

    // console.log("Captcha value:", value);
  }

  const customId = "custom-id-yes";
  const difToast = () => {
    // console.log(user);
    toast.success("Register Success, Welcome " + user + ":)", {
      theme: "dark",
      toastId: customId,
    });
  };
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      {success ? (
        <section >
          <Login>
            <Route exact path="/login" component={Login} />
          </Login>

          <br />
          <p>
            {difToast}
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </p>
        </section>
      ) : (
        <div className="register ">
          <Link to="/">
            <img
              className="register__logo"
              src="/assets/shipshop-logo.png"
              style={{width:"180px",height:"35px"}} alt="logo"
            />
          </Link>
          <div className="register__container ">
            <p
              ref={errRef}
              className={errorMsg ? "errorMsg" : "offScreen"}
              aria-live="assertive"
            >
              {errorMsg}
            </p>
            <h1>Create Account</h1>
            <form onSubmit={registerHandler}>
              <h5>
                Name
                <span className={validName ? "valid" : "hide"}>
                  <FontAwesomeIcon color="green" icon={faCheck} />
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                  <FontAwesomeIcon color="red" icon={faTimes} />
                </span>
              </h5>
              <input
                type="text"
                ref={userRef}
                value={user}
                autoComplete="off"
                required
                onChange={(e) => {
                  setUser(e.target.value);
                }}
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />4 to 24 characters.
                <br />
                Must begin with a letter. <br />
                Letters, Numbers,underscores,hyphens allowed
              </p>
              <h5>
                E-mail
                <span className={validEmail ? "valid" : "hide"}>
                  <FontAwesomeIcon color="green" icon={faCheck} />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                  <FontAwesomeIcon color="red" icon={faTimes} />
                </span>
              </h5>
              <input
                type="email"
                ref={emailRef}
                value={email}
                autoComplete="off"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="emailnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be an valid Email. <br />
              </p>
              <h5>
                Password
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPassword ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPassword || !password ? "hide" : "invalid"}
                />
              </h5>
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={validPassword ? "false" : "true"}
                aria-describedby="passwordnote"
                onFocus={() => setpasswordFocus(true)}
                onBlur={() => setpasswordFocus(false)}
              />
              <i
                onClick={togglePassword}
                class="far fa-eye"
                id="togglePassword"
                style={{ marginLeft: " -30px", cursor: "pointer" }}
              ></i>
              <p
                id="passwordnote"
                className={
                  passwordFocus && !validPassword ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />8 to24 characters. <br />{" "}
                must include uppercase and lowercase letters , a number and a
                speacial characters. : <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign ">$</span>
                <span aria-label="precent">%</span>
              </p>
              <h5>
                Confirm Password
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPassword ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPassword ? "hide" : "invalid"}
                />
              </h5>
              <input
                type={passwordShown ? "text" : "password"}
                id="confirm_password"
                value={matchPassword}
                required
                onChange={(e) => setMatchPassword(e.target.value)}
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <i
                onClick={togglePassword}
                class="far fa-eye"
                id="togglePassword"
                style={{ marginLeft: " -30px", cursor: "pointer" }}
              ></i>
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password.
              </p>

              <ReCAPTCHA sitekey={SITE_KEY} onChange={onChange} />

              <button
                disabled={
                  !validEmail ||
                  !validName ||
                  !validPassword ||
                  !validMatch ||
                  !human.verify
                    ? true
                    : false
                }
                // onClick={signIn}
                type="submit"
                className="login__signin__button"
                onClick={difToast}
              >
                Sign Up
              </button>
            </form>
            <p>
              By creating an account, you agree to our Terms of Use and our{" "}
              <a href="/about"> Privacy Policy.</a>
            </p>
            <button
              href="/login"
              // onClick={register}
              className="login__registerbutton "
            >
              <NavLink to="/login">Already have an account?</NavLink>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default register;

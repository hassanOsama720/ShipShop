import React, { useState, useRef, useEffect, useContext } from "react";
import { GoogleLogin } from "react-google-login";
import AuthContext from "../../Context/AuthProvider";
import { NavLink, useHistory } from "react-router-dom";
import Products from "./../Products/Products";
import "./login.css";
import { Link, Redirect } from "react-router-dom";
import { dispatchLogin } from "../../redux/action/authaction";
import { useDispatch } from "react-redux";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./ForgotPassword";
import { Switch, Route } from "react-router-dom";
import Product from "./../../components/Product";
import Home from "./../../components/Home";
import PasswordButton from "./../../components/PasswordButton";

function Login() {
  const initialState = {
    email: "",
    password: "",
    err: "",
    success: "",
  };
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState(initialState);

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("/google_login", {
        tokenId: response.tokenId,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      // console.log("RES",res)

      localStorage.setItem("email", res.data.data.email);
      localStorage.setItem("accessToken", res.data.data.accessToken);
      localStorage.setItem("role", "customer");
      localStorage.setItem("name", res.data.data.name);
      localStorage.setItem("_id", res.data.data.id);

      localStorage.setItem("data", res.data.data);
      window.location.replace("/");
      // history.goBack()

      setSuccess(true);
      let data = response.data;
      // console.log("DATA")
      return data;
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 500) {
        setErrMsg("Missing Email Or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errorRef.current.focus();
    }

    // setUser({ ...user, error: "", success: res.data.msg });
    // localStorage.setItem("firstLogin", true);

    // dispatch(dispatchLogin());
    // history.push("/");
  };

  const { setAuth } = useContext(AuthContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const emailRef = useRef();
  const errorRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  async function loginHandler(e) {
    e.preventDefault();
    try {
      let response = await axios({
        method: "post",
        url: "http://localhost:8080/login",

        data: { email: email, password: password },
      });

      localStorage.setItem("email", email);
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("role", response.data.data.role);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem("order", response.data.data.orders);
      localStorage.setItem("_id", response.data.data._id);

      localStorage.setItem("data", response.data.data);

      window.location.replace("/");
      // history.goBack()
      setSuccess(true);
      let data = response.data;

      return data;
    } catch (error) {
      setErrMsg(error.message);
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 500) {
        setErrMsg("Missing Email Or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("invalid email or password");
      } else if (error.response?.status === 403) {
        setErrMsg("user banned");
      } else {
        setErrMsg("Login Failed");
      }
      errorRef.current.focus();
    }
  }

  // const name = email.substring(0, email.lastIndexOf("@"));
  // const customId = "custom-id-yes";
  // const difToast = () => {
  //   toast.success(
  //     "Login Success, Welcome "+localStorage.getItem("name"),
  //     {
  //       theme: "dark",
  //       toastId: customId,
  //     }
  //   );
  // };

  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      {success ? (
        <section>
          <Home>
            <Route exact path="/" component={Home} />
          </Home>

          <br />
          {/* <p>
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
          </p> */}
        </section>
      ) : (
        <div className="login ">
          <Link to="/">
            <img
              className="login__logo"
              src="/assets/shipshop-logo.png"
              style={{ width: "180px", height: "35px" }}
              alt="logo"
            />
          </Link>
          <div className="login__container ">
            <p
              ref={errorRef}
              className={errMsg ? "errMsg" : "offScreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={loginHandler}>
              <h5>E-mail </h5>
              <input
                type="text"
                ref={emailRef}
                value={email}
                autoComplete="off"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <h5>Password</h5>
              <input
                type={passwordShown ? "text" : "password"}
                // type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                onClick={togglePassword}
                class="far fa-eye"
                id="togglePassword"
                style={{ marginLeft: " -30px", cursor: "pointer" }}
              ></i>
              {/* <Link
                to="/forgotPassword"
                style={{
                  fontSize: "12px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "crimson",
                  marginLeft: "10rem",
                }}
              >
                Forgot Your Password?
              </Link> */}

              <button
                // onClick={signIn}
                type="submit"
                className="login__signin__button"
                // onClick={difToast}
              >
                Sign In
              </button>
              <div className="social">
                <GoogleLogin
                  className="google"
                  clientId="911262537698-u34luk6o30r68m36glnk0hk3ae0e3scn.apps.googleusercontent.com"
                  buttonText="Login with google"
                  onSuccess={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </form>
            <p>
              by signing in you agree to our application conditions of use &
              sale . please see your <a href="/about">privacy notice</a> <br />
              <a href="/contact"> need a help!!</a>
            </p>
            <button
              // onClick={register}
              className="login__registerbutton"
            >
              <NavLink to="/register"> Create Your Account</NavLink>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;

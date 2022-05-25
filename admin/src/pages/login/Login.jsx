import "./login.scss"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();


  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault();
    login(navigate, dispatch, { email, password });
  };

  const isAdmin = useSelector((state) => state.user.currentUser) != null;


  useEffect(() => {
    console.log(isAdmin);
    if (isAdmin) {
      navigate("/home",{replace:true});
      // window.location.replace("/");
    }


  }, [isAdmin]);


  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} style={{ padding: 10, width: 100 }}>
        Login
      </button>
    </div>
  );
};

export default Login;

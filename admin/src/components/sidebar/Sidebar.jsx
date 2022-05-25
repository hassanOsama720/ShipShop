import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EmailIcon from '@mui/icons-material/Email';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"

const Sidebar = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("persist:root");
    window.location.replace("/");
  }

  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{ padding: "2em" }}>
            <img src={logo} style={{ width: "100%", marginTop: "0.5em" }} alt="logo" />
          </div>

          {/* <span className="logo">ShipShop</span> */}
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/categories" style={{ textDecoration: "none" }}>
          <li>
            <CategoryIcon className="icon" />
            <span>Cateogeries</span>
          </li>
        </Link>
        <Link to="/emails" style={{ textDecoration: "none" }}>
        <li>
          <EmailIcon className="icon" />
          <span>Messages</span>
        </li>
        </Link>
        {/* <li>
          <LocalOfferIcon className="icon" />
          <span>Coupons</span>
        </li> */}


        <p className="title">USER</p>
        {/* <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li> */}
        <li onClick={logout}>
          <ExitToAppIcon className="icon" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
    </div >
  );
};

export default Sidebar;

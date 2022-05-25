import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Table from "../../components/table/Table";
import { getStats } from "../../redux/apiCalls";
import { useState, useEffect } from "react";
import axios from "axios";

const CONFIG = () => {
  let token = "";
  if (localStorage.getItem("persist:root"))
    token = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
      .currentUser?.accessToken;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
const Home = () => {

  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/stats", CONFIG()).then(res => {
      setStats(res.data);
      console.log(stats);
    });
    // console.log("get", getStats());
    // setStats(await getStats());
    // console.log("stats:", stats)

  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="dataContainer">
        <div className="homeContainer">

          <div className="widgets">
            <Widget type="user" amount={stats.users} />
            <Widget type="order" amount={stats.orders} />
            <Widget type="product" amount={stats.products} />
            <Widget type="category" amount={stats.categories} />
          </div>

          <div className="listContainer">
            <div className="listTitle">Latest Orders</div>
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios"
import { useEffect, useState, } from "react";

const List = () => {
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
  const getOrders = () => {
    // const res = await axios.get('http://localhost:8080/orders?new=true',CONFIG());
    // const data = res.data.data;
    // console.log("new orders:", data);
    // setOrders(data);

    const res = axios.get('http://localhost:8080/orders?new=true', CONFIG()).then(
      res => setOrders(res.data)
    )
    // const data = res.data.data;
    // console.log("new orders:", data);
    // setOrders(data);

    // const options = data.map(d => ({
    //     "value": d._id,
    //     "label": d.name
    // }))
  }
  useEffect(() => {
    getOrders();
    console.log("hello useEffects")
    console.log("orders", orders);

  }, []);

  const [orders, setOrders] = useState([]);


  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* <TableCell className="tableCell">Order ID</TableCell> */}
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Total Price</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow key={row._id}>
              {/* <TableCell className="tableCell">{row._id}</TableCell> */}
              <TableCell className="tableCell">{row.customerName}</TableCell>
              <TableCell className="tableCell">{new Date(row.createdAt).toLocaleString()}</TableCell>
              <TableCell className="tableCell">{row.totalPrice}</TableCell>
              <TableCell className="tableCell">{row.paymentType == "cod" ? "Cash On Delivery" : "Card"}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.orderStatus}`}>{row.orderStatus}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;

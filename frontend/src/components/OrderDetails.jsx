import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function BasicTable() {
  const { id } = useParams();
  var itemz = [];
  var infoz = [];
  const orderState = useSelector((state) => state.handleOrders);
  if (infoz.length === 0)
    for (let i = 0; i < orderState.length; i++) {
      if (orderState[i]._id && id === orderState[i]._id) {
        itemz.push(orderState[i].orderItems);
        infoz.push(orderState[i]);
        break;
      }
    }

  return (
    <div className="min-vh-100">
      <TableContainer component={Paper} className="container my-5 ">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="right">order date</TableCell>
              <TableCell align="right">quantity</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemz.length > 0 &&
              itemz[0].map((row) => (
                <TableRow
                  key={row.createdAt}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      src={row.images[0]}
                      height="200px"
                      width="180px"
                      alt={row.createdAt}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {new Date(infoz[0].createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">{infoz[0].orderStatus}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

    // import { NavLink } from 'react-router-dom'
    /*
function OrderDetails() {
  return (
    <div className=" row order-products justify-content-between">
      <div className="col-lg-8 mt-5 mx-5">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="col-lg-3 d-flex align-items-end flex-column mt-5  px-5  subtotal-order">
        <table className="table table-striped ">
          <tbody>
            <tr>
              <td>
                <strong>Products</strong>
              </td>
              <td>$50</td>
            </tr>
            <tr>
              <td>
                <strong>Shipping</strong>
              </td>
              <td>$50</td>
            </tr>
            <tr>
              <td>
                <strong>Tax</strong>
              </td>
              <td>$50</td>
            </tr>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>$10000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
>>>>>>> ac9da487ff103bc87a4dd4c1a5c56ffbfedccc84
  );
}
*/
  );
}

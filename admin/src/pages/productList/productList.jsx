import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.scss"
import { deleteProduct, getProducts, getCategories } from "../../redux/apiCalls";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductList() {
    const notifySuccess = () => toast.success("product deleted");

    const dispatch = useDispatch();
    const [catOptions, setCatOptions] = useState([]);

    const products = useSelector((state) => state.product.products.data);
    const categories = useSelector((state) => state.categories.categories);

    console.log("products", products);

    // const getCategories = async () => {
    //     const res = await axios.get('http://localhost:8080/categories')
    //     const data = res.data.data;
    //     console.log("cat data", data);
    //     setCatOptions(data);
    //     return data;
    // }


    console.log("catOptions", catOptions);
    useEffect(() => {
        getProducts(dispatch);
        getCategories(dispatch);
        console.log("categories", categories);
        console.log("products", products);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteProduct(id, dispatch, notifySuccess);
    };

    const getCategoryName = (catID) => {
        let c = categories.find(ca => ca._id == catID)
        return c.name;
    }

    const columns = [
        // { field: "_id", headerName: "ID", width: 220 },

        {
            field: "product",
            headerName: "Image",
            width: 70,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.images[0]} alt="" />

                    </div>
                );
            },
        },
        { field: "name", headerName: "Product Name", width: 300 },
        {
            field: "category_id",
            headerName: "Category",
            width: 150,
            renderCell: (params) => {
                return (

                    getCategoryName(params.row.category_id).toString()

                );
            },
        },
        // { field: "category_id", headerName: "Category", width: 220 },
        { field: "quantity", headerName: "Quantiy", width: 220 },
        //   { field: "inStock", headerName: "Stock", width: 200 },
        {
            field: "price",
            headerName: "Price",
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/products/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>

                        {/* <button className="productListEdit" onClick={() => handleDelete(params.row._id)}>
                            Delete
                        </button> */}

                        <DeleteOutlineIcon
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}

                        />
                    </>
                );
            },
        },
    ];

    return (

        <div className="list">
            <Sidebar />
            <ToastContainer />

            <div className="dataContainer">

                <div className="datagrid">
                    <DataGrid
                        rows={products}
                        disableSelectionOnClick
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSize={8}
                        rowsPerPageOptions={[8]}

                    />
                </div>

                <Link to="/products/new" replace>
                    <button className="addButton">Add New Product</button>
                </Link>


            </div>
        </div>
    );
}

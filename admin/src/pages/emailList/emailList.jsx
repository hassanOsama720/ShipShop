import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button } from '@mui/material';
import { display } from '@mui/system';

// import { getUsers, deleteUser } from '../../redux/apiCalls';
import { getEmails } from '../../redux/apiCalls';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const EmailsList = () => {
    // const notify = () => toast.success("category deleted");

    const dispatch = useDispatch();
    const emails = useSelector((state) => state.emails.emails);
    // const isAdmin = useSelector((state) => state.user.currentUser) != null;


    useEffect(() => {
        getEmails(dispatch);
        // console.log("eeemaaails",emails);
    }, [dispatch]);

    // const handleDelete = (id) => {
    //     deleteCategory(id, dispatch, notify);
    // };

    const columns = [

        // { field: "_id", headerName: "ID", width: 250 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "email", headerName: "email", width: 250 },
        { field: "phone", headerName: "Phone", width: 250 },
        { field: "message", headerName: "message", width: 450 },


        // {
        //     field: "action",
        //     headerName: "Action",
        //     width: 150,
        //     renderCell: (params) => {
        //         return (
        //             <>
        //                 <Link to={"/categories/" + params.row._id}>
        //                     <button className="productListEdit">Edit</button>
        //                 </Link>
        //                 <DeleteOutlineIcon
        //                     className="productListDelete"
        //                     onClick={() => handleDelete(params.row._id)}
        //                 />
        //             </>
        //         );
        //     },
        // },
    ];
    // <div className="list">
    // <Sidebar />
    // <div className="listContainer">
    //     <DataGrid

    return (
        <div className="list">
            <Sidebar />
            {/* <ToastContainer /> */}
            <div className="dataContainer">
                <div className="datagrid">
                    <DataGrid
                        rows={emails}
                        disableSelectionOnClick
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        pagination


                    />
                </div>
                {/* <Link to="/categories/new" replace>
                    <button className="addButton">Add New Category</button>
                </Link> */}

            </div>
        </div>
    )
}

export default EmailsList
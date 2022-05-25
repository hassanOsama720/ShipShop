import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUsers, deleteUser, updateUser } from '../../redux/apiCalls';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button } from '@mui/material';
import { display } from '@mui/system';
import "./usersList.scss"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { request } from "../../requestMethods";
const UsersList = () => {

    const notify = () => toast.success("user deleted");
    const notifyUpdate = () => toast.success("user updated");
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);

    // const isAdmin = useSelector((state) => state.user.currentUser) != null;


    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteUser(id, dispatch, notify);
    };

    const ban = (id, user) => {
        updateUser(id, { ...user, ban: true }, dispatch, notifyUpdate)
    }

    const unban = (id, user) => {
        updateUser(id, { ...user, ban: false }, dispatch, notifyUpdate)
    }





    const columns = [
        // { field: "_id", headerName: "   ID", width: 250 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "email", headerName: "email", width: 250 },
        { field: "role", headerName: "role", width: 150 },

        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/users/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        {params.row.ban ?
                            <button className="banButton" onClick={() => unban(params.row._id, params.row)}>Unban</button>
                            :
                            <button className="banButton" onClick={() => ban(params.row._id, params.row)}>Ban</button>
                        }
                        {/* <button className="banButton" onClick={() => banUser(params.row._id)}>Ban</button> */}

                        {/* <DeleteOutlineIcon
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        /> */}

                    </>
                );
            },
        },
    ];
    // <div className="list">
    // <Sidebar />
    // <div className="listContainer">
    //     <DataGrid

    return (
        <div className="list">
            <Sidebar />
            <ToastContainer />
            <div className="dataContainer">
                <div className="datagrid">
                    <DataGrid
                        rows={users}
                        disableSelectionOnClick
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        pagination
                        // getRowClassName={(params) =>  {if(params.row.ban) return `row`}} 


                    />
                </div>
                {/* <Link to="/users/new" replace>
                    <button className="addButton">Add New User</button>
                </Link> */}

            </div>
        </div>
    )
}

export default UsersList
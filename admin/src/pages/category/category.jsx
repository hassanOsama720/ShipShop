// import {
//     CalendarToday,
//     LocationSearching,
//     MailOutline,
//     PermIdentity,
//     PhoneAndroid,
//     Publish,
//   } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import Sidebar from '../../components/sidebar/Sidebar';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../redux/apiCalls";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Category() {
    const notify = () => toast.success("category updated");
    const location = useLocation();
    const categoryId = location.pathname.split("/")[2];
    const dispatch = useDispatch();
    const category = useSelector((state) =>
        state.categories.categories.find((category) => category._id === categoryId)
    );
    const [categoryEdit, setcategoryEdit] = useState({ name: "", description: "", bannerImage: "" });

    // console.log(user);
    const handleChange = (e) => {
        setcategoryEdit((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    useEffect(() => {
        setcategoryEdit(category);
    }, [categoryId]);

    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log(categoryEdit);

        try {
            updateCategory(categoryEdit._id, categoryEdit, dispatch,notify);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="list">
            <Sidebar />
            <ToastContainer />
            <div className="dataContainer">
                <div className="user">
                    <div className="userContainer">
                        <div className="userShow">

                            <div className="userShowBottom">
                                <span className="userShowTitle">Category Details</span>
                                <div className="userShowInfo">
                                    {/* <PermIdentity className="userShowIcon" /> */}
                                    <img src={category.bannerImage} alt="" style={{ width: "100%" }} />
                                </div>
                                <div className="userShowInfo">
                                    {/* <PermIdentity className="userShowIcon" /> */}
                                    <span className="userShowInfoTitle"><strong>Name: </strong>{category.name}</span>
                                </div>
                                <div className="userShowInfo">
                                    {/* <PermIdentity className="userShowIcon" /> */}
                                    <span className="userShowInfoTitle"><strong>Description: </strong>{category.description}</span>
                                </div>

                            </div>
                        </div>
                        <div className="userUpdate">
                            <span className="userUpdateTitle">Edit</span>
                            <form className="userUpdateForm">
                                <div className="userUpdateLeft">
                                    <div className="userUpdateItem">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            placeholder="clothes"
                                            className="userUpdateInput"
                                            value={categoryEdit.name}
                                            onChange={handleChange}
                                            name="name"
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Description</label>
                                        <input
                                            type="text"
                                            className="userUpdateInput"
                                            value={categoryEdit.description}
                                            onChange={handleChange}
                                            name="description"
                                        />
                                    </div>
                                    <div className="userUpdateItem">
                                        <label>Image URL</label>
                                        <input
                                            type="text"
                                            className="userUpdateInput"
                                            value={categoryEdit.bannerImage}
                                            onChange={handleChange}
                                            name="bannerImage"
                                        />
                                    </div>

                                    <button className="userUpdateButton" onClick={handleSubmit}>Update</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

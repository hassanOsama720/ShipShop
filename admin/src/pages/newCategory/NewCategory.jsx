
import Sidebar from "../../components/sidebar/Sidebar";

import { addCategory } from "../../redux/apiCalls";
import { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewCategory = () => {
    const notifySuccess = () => toast.success("category added");
    const notifyError = (msg) => toast.error("An Error has Occured");

    const error = useSelector((state) => state.categories.error);
    const [inputs, setInputs] = useState({});
    const [category, setCategory] = useState("");

    useEffect(() => {


    }, []);
    const dispatch = useDispatch();


    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        // const data = new FormData(e.currentTarget);
        // let product = { ...inputs, category_id: category, properties: properties, images: [image] };
        console.log("inputs",inputs);

        try {
            addCategory(inputs, dispatch,{notifySuccess,notifyError});

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="list">
            <Sidebar />
            <ToastContainer />
            <div className="dataContainer" maxWidth="xs">

                <Container component="main">
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >


                        <Typography component="h1" variant="h5">
                            Add a Category
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} >

                            <TextField 
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                label="name"
                                id="name"
                                placeholder="electronics"
                                InputProps={{ inputProps: { min: 0 } }}
                                onChange={handleChange}

                            />
                            <TextField 
                                margin="normal"
                                required
                                fullWidth
                                name="description"
                                label="description"
                                id="description"
                                onChange={handleChange}
                                multiline

                            />
                            <TextField 
                                margin="normal"
                                required
                                fullWidth
                                name="bannerImage"
                                label="Banner Image URL"
                                id="bannerImage"
                                onChange={handleChange}

                            />









                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add Category
                            </Button>

                            {error ?
                                (<div style={{ textAlign: "center", color: "red" }}>
                                    <span >an error has occurred</span>
                                </div>) : <></>}




                        </Box>
                    </Box>

                </Container>

                {/* <div className="">
                    <form onSubmit={handleSubmit}>
                        <div className="formInput">
                            <label htmlFor="file">
                                Image: <DriveFolderUploadOutlinedIcon className="icon" />
                            </label>
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </div>

                        <div className="formInput">
                            <label>Name</label>
                            <input type="text" placeholder="Galaxy S22" name="name" onChange={handleChange} />
                        </div>

                        <div className="formInput">
                            <label>Brand</label>
                            <input type="text" placeholder="Samsung" name="brand" onChange={handleChange} />

                        </div>

                        <div className="formInput">
                            <label>Description</label>
                            <input type="text" name="description" onChange={handleChange} />
                        </div>

                        <div className="formInput">
                            <label>Properties</label>
                            <input type="text" name="properties" onChange={handlePropertiesChange} placeholder="Memory:8GB, Colour:Black" />
                        </div>


                        <div className="formInput">
                            <label>Quantity</label>
                            <input type="number" placeholder="1" name="quantity" onChange={handleChange} />
                        </div>


                        <div className="formInput">
                            <label>Price</label>
                            <input type="number" placeholder="999" name="price" onChange={handleChange} />
                        </div>

                        <div className="formInput">
                            <label>image url</label>
                            <input type="text" name="image" onChange={(e) => { setImage(e.target.value) }} />
                        </div>

                        <div className="formInput">
                            <label>Category</label>
                            <Select onChange={(e) => setCategory(e.target.value)}>
                                {
                                    catOptions.map(d => {
                                        return <MenuItem value={d._id}>{d.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </div>


                        <button type="submit">Add</button>
                    </form>
                </div> */}
            </div>
        </div>


    );
};

export default NewCategory;

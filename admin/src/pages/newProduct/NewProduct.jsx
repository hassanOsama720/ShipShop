import "./newProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";

import { useEffect, useState, } from "react";
import { addProduct } from "../../redux/apiCalls";
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

const NewProduct = () => {
    const notifySuccess = () => toast.success("product added");
    const notifyError = () => toast.error("an Error has occured");
    const error = useSelector((state) => state.product.error);
    const getOptions = async () => {
        const res = await axios.get('http://localhost:8080/categories')
        const data = res.data.data;
        console.log("cat data", data);

        // const options = data.map(d => ({
        //     "value": d._id,
        //     "label": d.name
        // }))

        setCatOptions(data);
    }
    const [catOptions, setCatOptions] = useState([]);
    const [file, setFile] = useState("");
    const [properties, setProperties] = useState({});
    const [image, setImage] = useState("");
    const [inputs, setInputs] = useState({});
    const [category, setCategory] = useState("");

    useEffect(() => {
        getOptions();
        console.log("options", catOptions);
        
    }, []);
    const dispatch = useDispatch();


    const handlePropertiesChange = (e) => {
        let input = e.target.value;
        let prop = {};
        for (let p of input.split(",")) {
            prop[p.split(":")[0]?.trim()] = p.split(":")[1]?.trim();
        }
        setProperties(prop);
    };

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        // const data = new FormData(e.currentTarget);
        let product = { ...inputs, category_id: category, properties: properties, images: [image] };
        console.log(product);

        try {
            addProduct(product, dispatch,{notifySuccess,notifyError});
     
       
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
                            Add a Product
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <TextField sx={{
                                    mx: "0.5em"
                                }}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Product Name"
                                    name="name"
                                    placeholder="Samsung Galaxy S22"
                                    onChange={handleChange}
                                />
                                <TextField sx={{
                                    mx: "0.5em"
                                }}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="brand"
                                    label="Brand"
                                    id="brand"
                                    placeholder="Samsung"
                                    onChange={handleChange}

                                />
                            </div>
                            <TextField sx={{
                                mx: "0.5em"
                            }}

                                margin="normal"
                                required
                                fullWidth
                                name="description"
                                label="description"
                                id="description"
                                onChange={handleChange}

                            />
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <TextField sx={{
                                    mx: "0.5em"
                                }}

                                    margin="normal"
                                    required
                                    fullWidth
                                    name="quantity"
                                    label="quantity"
                                    id="quantity"
                                    type="number"
                                    placeholder="23"
                                    InputProps={{ inputProps: { min: 0 } }}
                                    onChange={handleChange}

                                />
                                <TextField sx={{
                                    mx: "0.5em"
                                }}

                                    margin="normal"
                                    required
                                    fullWidth
                                    name="price"
                                    label="price"
                                    id="price"
                                    placeholder="1299"
                                    type="number"
                                    InputProps={{ inputProps: { min: 1 } }}
                                    onChange={handleChange}


                                />
                            </div>

                            <TextField sx={{
                                mx: "0.5em"
                            }}

                                margin="normal"
                                required
                                fullWidth
                                name="image"
                                label="image url"
                                id="image"
                                placeholder="1299"
                                onChange={(e) => { setImage(e.target.value) }}


                            />



                            <TextField sx={{
                                mx: "0.5em"
                            }}

                                margin="normal"
                                required
                                fullWidth
                                name="properties"
                                label="properties"
                                id="properties"
                                onChange={handlePropertiesChange}
                                placeholder="Memory:8GB, Colour:Black"

                            />
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <FormControl fullWidth sx={{
                                    m: "0.5em"
                                }}>
                                    <InputLabel id="cat-select-label">Category</InputLabel>
                                    <Select

                                        labelId="cat-select-label"
                                        id="category"
                                        label="category"
                                        name="category_id"

                                        onChange={(e) => setCategory(e.target.value)}

                                    >

                                        {
                                            catOptions.map(d => {
                                                return <MenuItem value={d._id}>{d.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{
                                    m: "0.5em"
                                }}>
                                    <InputLabel id="rating-select-label">Rating</InputLabel>
                                    <Select

                                        labelId="rating-select-label"
                                        id="rating"
                                        label="rating"
                                        name="rating"
                                        onChange={handleChange}

                                    >

                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>




                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add Item
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

export default NewProduct;

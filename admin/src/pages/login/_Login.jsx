import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.png"


const theme = createTheme();

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const isAdmin = useSelector((state) => state.user.currentUser) != null;
    const error = useSelector((state) => state.user.error);
    console.log("err",error);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
        let user = {
            email: data.get('email'),
            password: data.get('password'),
        }
        login(navigate, dispatch, user);
    };

    useEffect(() => {
        console.log(isAdmin);
        if (isAdmin) {
            navigate("/home", { replace: true });
        }

    }, [isAdmin]);

    return (
 
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >


                    <img src={logo} style={{ width: "200px", marginBottom: "2em" }} alt="logoIcon" />

                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField

                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus

                        />
                        <TextField

                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                        {error ?
                            (<div style={{ textAlign: "center", color: "red" }}>
                                <span >invalid credentials</span>
                            </div>) : <></>}


                    </Box>
                </Box>

            </Container>
    
    );
}
import { Box, Button, TextField } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Layout from "./Layout";
import { useAppDispatch } from "./store/hook";
import { registerUser } from "./store/slices/userSlice";


export interface NewUser {
    email: string;
    password: string;
}

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [newUser, setNewUser] = useState<NewUser>({ email: "", password: "" });

    // const registerUser = async () => {
    //     const response = await fetch("http://localhost:5000/register", {
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         method: "POST",
    //         body: JSON.stringify(newUser)
    //     });

    //     navigate("/login"); //programmatically navigation
    // }

    return (
        <Layout>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", m: 2, height: "100%" }}>
                <Box sx={{ display: "flex", flexDirection: "column", maxWidth: 200 }}>
                    <TextField
                        placeholder="email"
                        type="email"
                        sx={{ mb: 3 }}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <TextField
                        placeholder="password"
                        type="password"
                        sx={{ mb: 3 }}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />

                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button disabled={!newUser.email || !newUser.password} variant="contained" sx={{ width: "fit-content" }} onClick={() =>
                            dispatch(registerUser({
                                ...newUser,
                                onSuccess: () =>
                                    navigate("/login")
                            }))}>
                            Register
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Layout>
    )
}

export default Register
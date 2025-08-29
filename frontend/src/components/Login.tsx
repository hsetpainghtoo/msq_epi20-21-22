import { Box, TextField, Button } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { NewUser } from "./Register";
import Layout from "./Layout";
import { loginUser } from "./store/slices/userSlice";
import { useAppDispatch } from "./store/hook";

const Login = () => {

    interface User extends NewUser { }

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<User>({ email: "", password: "" })

    return (
        <Layout>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", mt: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", maxWidth: 200 }}>
                    <TextField
                        placeholder="email"
                        type="email"
                        sx={{ mb: 3 }}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    <TextField
                        placeholder="password"
                        type="password"
                        sx={{ mb: 3 }}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />

                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button disabled={!user.email || !user.password} variant="contained" sx={{ width: "fit-content" }} onClick={() => dispatch(loginUser({
                            ...user,
                            onSuccess: () => {
                                navigate("/");
                            }
                        }))}>
                            Login
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Layout>
    )
}

export default Login
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import { observer } from "mobx-react-lite"; 
import userStore from "../store/user-store/user-store"; 
import "./login-page.css";
import Signup from "../sign-up/sign-up";

const LoginPage: React.FC = () => {
    const usernameInputRef = useRef<HTMLInputElement | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (usernameInputRef.current) {
            usernameInputRef.current.focus();
        }
    }, []);

    const handleLogin = async () => {
        userStore.setEmail(username);
        userStore.setPassword(password);

        await userStore.login();

        if (userStore.isAuthenticated) {
            navigate(`/home/${userStore.userId}`); 
        } else {
            setError(userStore.authError || "An error occurred during login.");
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-header">
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Log in to your account</p>
                </div>

                <div className="login-form">
                    <TextField
                        inputRef={usernameInputRef}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={handleKeyPress} 
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyPress} 
                    />
                    {error && <p className="error">{error}</p>} 
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="login-button"
                        onClick={handleLogin}
                        disabled={userStore.isLoggingIn} 
                    >
                        {userStore.isLoggingIn ? "Logging in..." : "Log In"}
                    </Button>
                </div>
                <span className="to-login">
                    אינך מחוברת? 
                    <Button onClick={() => setShowPopup(true)}>להתחברות</Button>
                </span>
           
                {showPopup && <Signup onClose={() => setShowPopup(false)} />}
            </div>
        </div>
    );
};

export default observer(LoginPage); 

import React from "react";
import Button from 'react-bootstrap/Button';
import { signInWithGoogle } from "../utilities/firebase";
import { useProfile } from "../utilities/userProfile";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [user, error, isLoading] = useProfile();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        console.log(error);
        return <div>Error retrieving user profile...</div>;
    }
    if (user) {
        navigate("/");
    }
    return (
        <div>
            <h1>Login</h1>
            <Button onClick={signInWithGoogle} variant="primary">Sign in!</Button>
        </div>
    );
};

export default Login;

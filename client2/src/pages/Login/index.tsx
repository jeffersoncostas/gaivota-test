import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { authenticate } from "../../auth";

export default function Login() {
    const history = useHistory();
    const [loginForm, setLoginForm] = useState({
        email: "admin@gaivota.ai",
        password: ""
    });

    const handleChange = (key: any) => ({ target }: any) => {
        setLoginForm({ ...loginForm, [key]: target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const { email, password } = loginForm;
        try {

            // Here you can store the userData in any way
            const userData = await authenticate(email, password);
            console.log(userData, " sera?");

            history.push("/home");
        } catch (e) {
            console.error(e);
        }
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="input"
                    onChange={handleChange("email")}
                    value={loginForm.email}
                    placeholder="admin@gaivota.ai"
                />
                <input
                    name="password"
                    type="password"
                    onChange={handleChange("password")}
                    value={loginForm.password}
                    autoComplete="off"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

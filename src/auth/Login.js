import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./Login.module.css";
import Video from "../assets/audio/VideoMeme.mp4";
export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [secret, setSecret] = useState(false);
    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "Banan22" && password === "Banan22") {
            setSecret(true);
        }
        else {
            alert("Неверный логин или пароль");
        }
    };
    return (_jsx("div", { className: styles.container, children: secret ? (_jsx("div", { className: styles.secret, children: _jsx("video", { src: Video, width: "480", controls: true, autoPlay: true }) })) : (_jsxs("form", { onSubmit: handleLogin, className: styles.form, children: [_jsx("h2", { className: styles.title, children: "Enter" }), _jsx("input", { type: "text", placeholder: "Username", value: username, onChange: (e) => setUsername(e.target.value), className: styles.input }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), className: styles.input }), _jsx("button", { type: "submit", className: styles.button, children: "Enter" })] })) }));
}

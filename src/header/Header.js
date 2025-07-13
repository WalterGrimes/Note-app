import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import s from "./Header.module.css";
export function Header() {
    return (_jsxs("header", { className: s.header, children: [_jsx("div", { className: s.logo, children: _jsx(Link, { to: "/", children: "MyNotes" }) }), _jsxs("nav", { className: s.nav, children: [_jsx(Link, { to: "/", children: "Home" }), _jsx(Link, { to: "/login", children: "Login" })] })] }));
}

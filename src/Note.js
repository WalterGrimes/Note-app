import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNote } from "./NoteLayout";
import { Row, Col, Stack, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./App.css";
export function Note({ onDelete }) {
    const note = useNote();
    const navigate = useNavigate();
    return (_jsxs("div", { className: "note-detail", children: [_jsxs(Row, { className: "align-items-center mb-4", children: [_jsxs(Col, { children: [_jsx("h1", { className: "display-4", children: note.title }), _jsx("div", { className: "tags-container mt-2 mb-3", children: note.tags.map(tag => (_jsx("span", { className: "badge bg-primary me-2", children: tag.label }, tag.id))) })] }), _jsx(Col, { xs: "auto", children: _jsxs(Stack, { gap: 2, direction: "horizontal", className: "stack-responsive", children: [_jsx(Button, { variant: "primary", as: Link, to: `/${note.id}/edit`, className: "action-btn", children: "Edit" }), _jsx(Button, { variant: "outline-danger", onClick: () => {
                                        onDelete(note.id);
                                        navigate("/");
                                    }, className: "action-btn", children: "Delete" }), _jsx(Button, { variant: "outline-secondary", as: Link, to: "/", className: "action-btn", children: "Back" })] }) })] }), _jsx("div", { className: "markdown-content p-3 bg-white rounded", children: _jsx(ReactMarkdown, { children: note.markdown }) })] }));
}

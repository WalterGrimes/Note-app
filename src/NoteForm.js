import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Col, Form, Stack, Row, Button } from "react-bootstrap";
import CreatableSelect from 'react-select/creatable';
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import "./App.css";
export function NoteForm({ onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = [] }) {
    const titleRef = useRef(null);
    const markdownRef = useRef(null);
    const [selectedTags, setSelectedTags] = useState(tags);
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form sumbitted");
        onSubmit({
            title: titleRef.current.value,
            markdown: markdownRef.current.value,
            tags: selectedTags
        });
    }
    return (_jsx(Form, { onSubmit: handleSubmit, className: "note-form", children: _jsxs(Stack, { gap: 4, children: [_jsxs(Row, { children: [_jsx(Col, { md: 8, children: _jsxs(Form.Group, { controlId: "title", className: "mb-3", children: [_jsx(Form.Label, { className: "fw-bold", children: "Title" }), _jsx(Form.Control, { ref: titleRef, required: true, defaultValue: title, className: "form-control-lg" })] }) }), _jsx(Col, { md: 4, children: _jsxs(Form.Group, { controlId: "tags", className: "mb-3", children: [_jsx(Form.Label, { className: "fw-bold", children: "Tags" }), _jsx(CreatableSelect, { onCreateOption: label => {
                                            const newTag = { id: uuidV4(), label };
                                            onAddTag(newTag);
                                            setSelectedTags(prev => [...prev, newTag]);
                                        }, value: selectedTags.map(tag => ({
                                            label: tag.label,
                                            value: tag.id
                                        })), options: availableTags.map(tag => ({
                                            label: tag.label,
                                            value: tag.id
                                        })), onChange: tags => {
                                            setSelectedTags(tags.map(tag => ({
                                                id: tag.value,
                                                label: tag.label
                                            })));
                                        }, isMulti: true, className: "react-select-container", classNamePrefix: "react-select" })] }) })] }), _jsxs(Form.Group, { controlId: "markdown", className: "mb-4", children: [_jsx(Form.Label, { className: "fw-bold", children: "Content" }), _jsx(Form.Control, { as: "textarea", ref: markdownRef, required: true, defaultValue: markdown, rows: 15, className: "markdown-editor" })] }), _jsxs(Stack, { direction: "horizontal", gap: 2, className: "justify-content-end", children: [_jsx(Button, { type: "submit", variant: "primary", size: "lg", children: "Save" }), _jsx(Button, { as: Link, to: "..", variant: "outline-secondary", size: "lg", children: "Cancel" })] })] }) }));
}

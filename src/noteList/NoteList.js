import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Row, Col, Stack, Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { Card } from "react-bootstrap";
import { useState, useMemo } from "react";
import styles from "./NoteList.module.css";
export function NoteList({ availableTags, notes, onUpdateTag, onDeleteTag, }) {
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return ((title === "" ||
                note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 ||
                    selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id))));
        });
    }, [title, selectedTags, notes]);
    return (_jsxs("div", { className: styles.container, children: [_jsxs("div", { className: `d-flex justify-content-between align-items-center mb-4 ${styles.header}`, children: [_jsx("h1", { className: styles.title, children: "Notes" }), _jsxs("div", { className: "d-flex gap-2", children: [_jsx(Link, { to: "/new", children: _jsx(Button, { className: styles.createButton, children: "Create" }) }), _jsx(Button, { className: styles.editTagsButton, onClick: () => setEditTagsModalIsOpen(true), children: "Edit Tags" })] })] }), _jsx(Form, { className: styles.searchForm, children: _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsxs(Form.Group, { controlId: "title", children: [_jsx(Form.Label, { className: styles.formLabel, children: "Title" }), _jsx(Form.Control, { type: "text", value: title, onChange: e => setTitle(e.target.value), placeholder: "Search by title..." })] }) }), _jsx(Col, { md: 6, children: _jsxs(Form.Group, { controlId: "tags", children: [_jsx(Form.Label, { className: styles.formLabel, children: "Tags" }), _jsx(CreatableSelect, { isMulti: true, options: availableTags.map(tag => ({
                                            label: tag.label,
                                            value: tag.id,
                                        })), value: selectedTags.map(tag => ({
                                            label: tag.label,
                                            value: tag.id,
                                        })), onChange: tags => {
                                            setSelectedTags(tags.map(tag => ({
                                                label: tag.label,
                                                id: tag.value,
                                            })));
                                        }, className: "react-select-container", classNamePrefix: "react-select", placeholder: "Filter by tags..." })] }) })] }) }), _jsx(Row, { xs: 1, sm: 2, lg: 3, xl: 4, className: "g-4", children: filteredNotes.map(note => (_jsx(Col, { children: _jsx(NoteCard, { id: note.id, title: note.title, tags: note.tags }) }, note.id))) }), _jsx(EditTagsModal, { show: editTagsModalIsOpen, handleClose: () => setEditTagsModalIsOpen(false), availableTags: availableTags, onUpdateTag: onUpdateTag, onDeleteTag: onDeleteTag })] }));
}
function NoteCard({ id, title, tags }) {
    return (_jsx(Card, { as: Link, to: `/${id}`, className: `${styles.card} text-reset text-decoration-none`, children: _jsxs(Card.Body, { className: styles.cardBody, children: [_jsx(Card.Title, { className: styles.noteTitle, children: title }), tags.length > 0 && (_jsx(Stack, { gap: 1, direction: "horizontal", className: "flex-wrap", children: tags.map(tag => (_jsx("span", { className: styles.tag, children: tag.label }, tag.id))) }))] }) }));
}
function EditTagsModal({ availableTags, handleClose, show, onUpdateTag, onDeleteTag, }) {
    return (_jsxs(Modal, { show: show, onHide: handleClose, dialogClassName: styles.modalContent, children: [_jsx(Modal.Header, { closeButton: true, className: styles.modalHeader, children: _jsx(Modal.Title, { className: styles.modalTitle, children: "Edit Tags" }) }), _jsx(Modal.Body, { children: _jsx(Form, { children: _jsx(Stack, { gap: 2, children: availableTags.map(tag => (_jsxs(Row, { children: [_jsx(Col, { children: _jsx(Form.Control, { type: "text", className: styles.tagInput, value: tag.label, onChange: e => onUpdateTag(tag.id, e.target.value) }) }), _jsx(Col, { xs: "auto", children: _jsx(Button, { className: styles.deleteTagButton, onClick: () => onDeleteTag(tag.id), children: "\u00D7" }) })] }, tag.id))) }) }) }), _jsx(Modal.Footer, { children: _jsx(Button, { variant: "secondary", onClick: handleClose, children: "Close" }) })] }));
}

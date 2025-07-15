import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { NewNote } from "./NewNote";
import { Container } from "react-bootstrap";
import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { NoteList } from "./noteList/NoteList";
import { NoteLayout } from "./NoteLayout";
import { Note } from "./Note";
import { EditNote } from "./EditNote";
import Login from "./auth/Login";
import "./App.css";
import { Header } from "./header/Header";
import SoundButton from "./soundButtton/SoundButton";
import Video from "./assets/audio/VideoMeme.mp4";
const App = () => {
    const [notes, setNotes] = useLocalStorage("NOTES", []);
    const [tags, setTags] = useLocalStorage("TAGS", []);
    const notesWithTags = useMemo(() => {
        return notes.map(note => {
            return {
                ...note,
                tags: tags.filter(tag => note.tagIds.includes(tag.id))
            };
        });
    }, [notes, tags]);
    function onCreateNote({ tags, ...data }) {
        setNotes(prevNotes => {
            return [
                ...prevNotes,
                {
                    ...data,
                    id: uuidV4(),
                    tagIds: tags.map(tag => tag.id)
                }
            ];
        });
    }
    function onUpdateNote(id, { tags, ...data }) {
        setNotes(prevNotes => {
            return prevNotes.map(note => {
                if (note.id === id) {
                    return {
                        ...note,
                        ...data,
                        tagIds: tags.map(tag => tag.id)
                    };
                }
                else {
                    return note;
                }
            });
        });
    }
    function onDeleteNote(id) {
        setNotes(prevNotes => {
            return prevNotes.filter(note => note.id !== id);
        });
    }
    function addTag(tag) {
        setTags(prev => [...prev, tag]);
    }
    function updateTag(id, label) {
        setTags(prevTags => {
            return prevTags.map(tag => {
                if (tag.id === id) {
                    return { ...tag, label };
                }
                else {
                    return tag;
                }
            });
        });
    }
    function deleteTag(id) {
        setTags(prevTags => {
            return prevTags.filter(tag => tag.id !== id);
        });
    }
    return (_jsxs(Container, { className: "main-container my-4", children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(NoteList, { notes: notesWithTags, availableTags: tags, onUpdateTag: updateTag, onDeleteTag: deleteTag }) }), _jsx(Route, { path: "/new", element: _jsx(NewNote, { onSubmit: onCreateNote, onAddTag: addTag, availableTags: tags }) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsxs(Route, { path: "/:id", element: _jsx(NoteLayout, { notes: notesWithTags }), children: [_jsx(Route, { index: true, element: _jsx(Note, { onDelete: onDeleteNote }) }), _jsx(Route, { path: "edit", element: _jsx(EditNote, { onSubmit: onUpdateNote, onAddTag: addTag, availableTags: tags }) })] }), _jsx(Route, { path: "/*", element: _jsx(Navigate, { to: "/" }) })] })] }));
};
export default App;

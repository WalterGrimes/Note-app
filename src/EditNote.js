import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { NoteForm } from "./NoteForm";
import { useNote } from "./NoteLayout";
import "./App.css";
export function EditNote({ onSubmit, onAddTag, availableTags }) {
    const note = useNote();
    return _jsxs(_Fragment, { children: [_jsx("h1", { className: "mb-4", children: "Edit Note " }), _jsx(NoteForm, { title: note.title, markdown: note.markdown, tags: note.tags, onSubmit: data => onSubmit(note.id, data), onAddTag: onAddTag, availableTags: availableTags })] });
}

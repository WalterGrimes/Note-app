import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { NoteForm } from "./NoteForm";
export function NewNote({ onSubmit, onAddTag, availableTags }) {
    return _jsxs(_Fragment, { children: [_jsx("h1", { className: "mb-4", children: "New Note " }), _jsx(NoteForm, { onSubmit: onSubmit, onAddTag: onAddTag, availableTags: availableTags })] });
}

import { jsx as _jsx } from "react/jsx-runtime";
import { Outlet, useParams, Navigate, useOutletContext } from "react-router-dom";
import { useMemo } from "react";
export function NoteLayout({ notes }) {
    const { id } = useParams();
    // Находим Note по id
    const note = useMemo(() => notes.find(n => n.id === id), [id, notes]);
    if (note == null)
        return _jsx(Navigate, { to: "/", replace: true });
    // Передаём Note в Outlet через контекст
    return _jsx(Outlet, { context: note });
}
// ✅ Исправленный useNote, который возвращает Note, а не строку
export function useNote() {
    return useOutletContext();
}

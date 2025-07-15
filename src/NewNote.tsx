import { Tag, NoteData } from "@/types" // Updated import
import { NoteForm } from "./NoteForm"
import "./App.css"

type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
    return (
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
        </>
    )
}
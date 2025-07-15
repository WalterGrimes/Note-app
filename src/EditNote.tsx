import { Tag, NoteData } from "./App"
import { NoteForm } from "./NoteForm"
import { useNote } from "./NoteLayout"
import "./App.css"


type EditNoteProps = {
    onSubmit: (is: string, data: NoteData) => void
    onAddTag: (tags: Tag) => void
    availableTags: Tag[]
}


export function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
    const note = useNote()

    return <>
        <h1 className="mb-4">Edit Note </h1>
        <NoteForm title={note.title}
            markdown={note.markdown}
            tags={note.tags}
            onSubmit={data => onSubmit(note.id, data)}
            onAddTag={onAddTag}
            availableTags={availableTags} />

    </>


}
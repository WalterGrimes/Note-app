import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route, Navigate } from "react-router-dom"
import { NewNote } from "./NewNote"
import { Container } from "react-bootstrap"
import { useMemo } from "react"
import { useLocalStorage } from "./useLocalStorage"
import { v4 as uuidV4 } from "uuid"
import { NoteList } from "./noteList/NoteList"
import { NoteLayout } from "./NoteLayout"
import { Note } from "./Note"
import { EditNote } from "./EditNote"
import Login from "./auth/Login"
import "./App.css"
import { Header } from "./header/Header"
import SoundButton from "./soundButtton/SoundButton"
import Video from "./assets/audio/VideoMeme.mp4"

export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type RawNote = {
  id: string
  title: string
  markdown: string
  tagIds: string[]
}

export type Tag = {
  id: string
  label: string
}

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note,
        tags: tags.filter(tag => note.tagIds.includes(tag.id))
      }
    })
  }, [notes, tags])

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes, 
        { 
          ...data, 
          id: uuidV4(), 
          tagIds: tags.map(tag => tag.id) 
        }
      ]
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return {
            ...note,
            ...data, 
            tagIds: tags.map(tag => tag.id)
          }
        } else {
          return note
        }
      })
    })
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

 return (
  <Container className="main-container my-4">
    <Header /> 
    {/* <SoundButton videoSrc={Video}/> */}

    <Routes>
      <Route 
        path="/" 
        element={
          <NoteList 
            notes={notesWithTags} 
            availableTags={tags} 
            onUpdateTag={updateTag}
            onDeleteTag={deleteTag}
          />
        } 
      />
      
      <Route 
        path="/new" 
        element={
          <NewNote 
            onSubmit={onCreateNote} 
            onAddTag={addTag} 
            availableTags={tags} 
          />
        } 
      />

      <Route 
        path="/login" 
        element={<Login />} 
      />

      <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
        <Route index element={<Note onDelete={onDeleteNote} />} />
        <Route 
          path="edit" 
          element={
            <EditNote 
              onSubmit={onUpdateNote}
              onAddTag={addTag} 
              availableTags={tags}
            />
          } 
        />
      </Route>
      
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  </Container>
)
}

export default App
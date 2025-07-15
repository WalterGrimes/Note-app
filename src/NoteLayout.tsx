import { Outlet, useParams, Navigate, useOutletContext } from "react-router-dom"
import { Note } from "@/types" // Обязательно: правильный импорт типа Note
import { useMemo } from "react"

// Этот компонент находит нужную заметку по ID из параметра URL
type NoteLayoutProps = {
  notes: Note[] // Твои заметки с тегами
}

export function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams<{ id: string }>()
  
  // Находим Note по id
  const note = useMemo(() => notes.find(n => n.id === id), [id, notes])

  if (note == null) return <Navigate to="/" replace />

  // Передаём Note в Outlet через контекст
  return <Outlet context={note} />
}

// ✅ Исправленный useNote, который возвращает Note, а не строку
export function useNote() {
  return useOutletContext<Note>()
}

import { useNote } from "./NoteLayout"
import { Row, Col, Stack, Badge, Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import "./App.css"

type NoteProps = {
  onDelete: (id: string) => void
}

export function Note({ onDelete }: NoteProps) {
  const note = useNote()
  const navigate = useNavigate()

  return (
    <div className="note-detail">
      <Row className="align-items-center mb-4">
        <Col>
          <h1 className="display-4">{note.title}</h1>
          <div className="tags-container mt-2 mb-3">
            {note.tags.map(tag => (
              <span key={tag.id} className="badge bg-primary me-2">
                {tag.label}
              </span>
            ))}
          </div>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal" className="stack-responsive">
            <Button 
              variant="primary" 
              as={Link as any} 
              to={`/${note.id}/edit`}
              className="action-btn"
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => {
                onDelete(note.id)
                navigate("/")
              }}
              className="action-btn"
            >
              Delete
            </Button>
            <Button 
              variant="outline-secondary" 
              as={Link as any} 
              to="/"
              className="action-btn"
            >
              Back
            </Button>
          </Stack>
        </Col>
      </Row>
      <div className="markdown-content p-3 bg-white rounded">
        <ReactMarkdown>{note.markdown}</ReactMarkdown>
      </div>
    </div>
  )
}
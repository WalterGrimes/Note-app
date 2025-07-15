import { Row, Col, Stack, Button, Form, Modal } from "react-bootstrap"
import { Link } from "react-router-dom"
import CreatableSelect from "react-select/creatable"
import { Tag } from "../types"
import { Card } from "react-bootstrap"
import { useState, useMemo } from "react"
import styles from "./NoteList.module.css"

type SimplifiedNote = {
  tags: Tag[]
  title: string
  id: string
}

type NoteListProps = {
  availableTags: Tag[]
  notes: SimplifiedNote[]
  onUpdateTag: (id: string, label: string) => void
  onDeleteTag: (id: string) => void
}

type EditTagsModalProps = {
  show: boolean
  availableTags: Tag[]
  handleClose: () => void
  onUpdateTag: (id: string, label: string) => void
  onDeleteTag: (id: string) => void
}

export function NoteList({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps) {
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            note.tags.some(noteTag => noteTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, notes])

  return (
    <div className={styles.container}>
      <div className={`d-flex justify-content-between align-items-center mb-4 ${styles.header}`}>
        <h1 className={styles.title}>Notes</h1>
        <div className="d-flex gap-2">
          <Link to="/new">
            <Button className={styles.createButton}>Create</Button>
          </Link>
          <Button
            className={styles.editTagsButton}
            onClick={() => setEditTagsModalIsOpen(true)}
          >
            Edit Tags
          </Button>
        </div>
      </div>

      <Form className={styles.searchForm}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="title">
              <Form.Label className={styles.formLabel}>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Search by title..."
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="tags">
              <Form.Label className={styles.formLabel}>Tags</Form.Label>
              <CreatableSelect
                isMulti
                options={availableTags.map(tag => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                value={selectedTags.map(tag => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => ({
                      label: tag.label,
                      id: tag.value,
                    }))
                  )
                }}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Filter by tags..."
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>

      <EditTagsModal
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModalIsOpen(false)}
        availableTags={availableTags}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
    </div>
  )
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Card
      as={Link as any}
      to={`/${id}`}
      className={`${styles.card} text-reset text-decoration-none`}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styles.noteTitle}>{title}</Card.Title>
        {tags.length > 0 && (
          <Stack gap={1} direction="horizontal" className="flex-wrap">
            {tags.map(tag => (
              <span key={tag.id} className={styles.tag}>
                {tag.label}
              </span>
            ))}
          </Stack>
        )}
      </Card.Body>
    </Card>
  )
}

function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onUpdateTag,
  onDeleteTag,
}: EditTagsModalProps) {
  return (
    <Modal show={show} onHide={handleClose} dialogClassName={styles.modalContent}>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map(tag => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type="text"
                    className={styles.tagInput}
                    value={tag.label}
                    onChange={e => onUpdateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    className={styles.deleteTagButton}
                    onClick={() => onDeleteTag(tag.id)}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

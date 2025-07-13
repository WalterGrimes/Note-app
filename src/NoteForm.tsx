import { Col, Form, Stack, Row, Button } from "react-bootstrap"
import CreatableSelect from 'react-select/creatable'
import { Link } from "react-router-dom"
import { FormEvent, useRef, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import { NoteData, Tag } from "./App"
import "./App.css"

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<NoteData>

export function NoteForm({ 
  onSubmit, 
  onAddTag, 
  availableTags, 
  title = "", 
  markdown = "", 
  tags = []
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log("Form sumbitted")

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags
    })
  }

  return (
    <Form onSubmit={handleSubmit} className="note-form">
      <Stack gap={4}>
        <Row>
          <Col md={8}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label className="fw-bold">Title</Form.Label>
              <Form.Control 
                ref={titleRef} 
                required 
                defaultValue={title}
                className="form-control-lg"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="tags" className="mb-3">
              <Form.Label className="fw-bold">Tags</Form.Label>
              <CreatableSelect
                onCreateOption={label => {
                  const newTag = { id: uuidV4(), label }
                  onAddTag(newTag)
                  setSelectedTags(prev => [...prev, newTag])
                }}
                value={selectedTags.map(tag => ({
                  label: tag.label,
                  value: tag.id
                }))}
                options={availableTags.map(tag => ({
                  label: tag.label,
                  value: tag.id
                }))}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => ({
                      id: tag.value,
                      label: tag.label
                    }))
                  )
                }}
                isMulti
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown" className="mb-4">
          <Form.Label className="fw-bold">Content</Form.Label>
          <Form.Control 
            as="textarea" 
            ref={markdownRef} 
            required 
            defaultValue={markdown}
            rows={15}
            className="markdown-editor"
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary" size="lg">
            Save
          </Button>
          <Button 
            as={Link as any} 
            to=".." 
            variant="outline-secondary" 
            size="lg"
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Form>
  )
}
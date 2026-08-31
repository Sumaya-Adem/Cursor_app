import { useState } from 'react'

function TodoItem({
  task,
  onToggle,
  onDelete,
  onEdit,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  function saveEdit() {
    const trimmedText = editText.trim()

    if (trimmedText === '') {
      setEditText(task.text)
    } else if (trimmedText !== task.text) {
      onEdit(task.id, trimmedText)
    }

    setIsEditing(false)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      saveEdit()
    }

    if (event.key === 'Escape') {
      setEditText(task.text)
      setIsEditing(false)
    }
  }

  return (
    <li
      className={`todo-item ${task.completed ? 'completed' : ''} ${isDragging ? 'dragging' : ''}`}
      onDragOver={(event) => onDragOver(event, task.id)}
      onDrop={(event) => onDrop(event, task.id)}
    >
      <button
        type="button"
        className="drag-handle"
        draggable="true"
        aria-label="Reorder task"
        onDragStart={(event) => onDragStart(event, task.id)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.text} as ${task.completed ? 'active' : 'completed'}`}
      />

      {isEditing ? (
        <input
          className="edit-input"
          value={editText}
          autoFocus
          onChange={(event) => setEditText(event.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span
          className="task-text"
          onClick={() => {
            setEditText(task.text)
            setIsEditing(true)
          }}
        >
          {task.text}
        </span>
      )}

      <button type="button" className="delete-btn" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  )
}

export default TodoItem

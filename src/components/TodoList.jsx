import TodoItem from './TodoItem'

function TodoList({
  tasks,
  draggedId,
  onToggle,
  onDelete,
  onEdit,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  if (tasks.length === 0) {
    return <p className="empty">No tasks to show.</p>
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          isDragging={draggedId === task.id}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </ul>
  )
}

export default TodoList

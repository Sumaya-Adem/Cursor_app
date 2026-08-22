function TodoInput({ text, onTextChange, onAdd }) {
  function handleSubmit(event) {
    event.preventDefault()
    onAdd()
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(event) => onTextChange(event.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default TodoInput

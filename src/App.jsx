import { useEffect, useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoFilters from './components/TodoFilters'
import './App.css'

const STORAGE_KEY = 'todo-app-tasks'

function getSavedTasks() {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (!saved) {
    return []
  }

  return JSON.parse(saved)
}

function App() {
  const [tasks, setTasks] = useState(getSavedTasks)
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('All')
  const [draggedId, setDraggedId] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask() {
    const trimmedText = text.trim()

    if (trimmedText === '') {
      return
    }

    const newTask = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
    }

    setTasks([...tasks, newTask])
    setText('')
  }

  function toggleTask(id) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })

    setTasks(updatedTasks)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => task.id !== id)
    setTasks(remainingTasks)
  }

  function editTask(id, newText) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, text: newText }
      }
      return task
    })

    setTasks(updatedTasks)
  }

  function clearCompleted() {
    const activeTasks = tasks.filter((task) => !task.completed)
    setTasks(activeTasks)
  }

  function handleDragStart(event, id) {
    setDraggedId(id)
    event.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(event) {
    event.preventDefault()
  }

  function handleDrop(event, targetId) {
    event.preventDefault()

    if (draggedId === null || draggedId === targetId) {
      setDraggedId(null)
      return
    }

    const fromIndex = tasks.findIndex((task) => task.id === draggedId)
    const toIndex = tasks.findIndex((task) => task.id === targetId)
    const updatedTasks = [...tasks]
    const [movedTask] = updatedTasks.splice(fromIndex, 1)
    updatedTasks.splice(toIndex, 0, movedTask)

    setTasks(updatedTasks)
    setDraggedId(null)
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') {
      return !task.completed
    }
    if (filter === 'Completed') {
      return task.completed
    }
    return true
  })

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const remainingTasks = totalTasks - completedTasks

  return (
    <div className="app">
      <header className="header">
        <div className="logo" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8.2 6.4 11.5 13 4.5"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1>TODO</h1>
      </header>

      <TodoInput text={text} onTextChange={setText} onAdd={addTask} />

      <div className="todo-body">
        <div className="toolbar">
          <div className="counters">
            <span>Total: {totalTasks}</span>
            <span>Completed: {completedTasks}</span>
            <span>Remaining: {remainingTasks}</span>
          </div>

          <TodoFilters
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
            hasCompleted={completedTasks > 0}
          />
        </div>

        <TodoList
          tasks={filteredTasks}
          draggedId={draggedId}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      </div>
    </div>
  )
}

export default App

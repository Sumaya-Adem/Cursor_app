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

  function clearCompleted() {
    const activeTasks = tasks.filter((task) => !task.completed)
    setTasks(activeTasks)
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
    <main className="page">
      <div className="card">
        <h1>To-Do App</h1>
        <p className="subtitle">Keep track of your tasks.</p>

        <TodoInput text={text} onTextChange={setText} onAdd={addTask} />

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

        <TodoList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </div>
    </main>
  )
}

export default App

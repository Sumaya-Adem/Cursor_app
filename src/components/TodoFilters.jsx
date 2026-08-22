function TodoFilters({ filter, onFilterChange, onClearCompleted, hasCompleted }) {
  const filters = ['All', 'Active', 'Completed']

  return (
    <div className="todo-filters">
      <div className="filter-buttons">
        {filters.map((name) => (
          <button
            key={name}
            type="button"
            className={filter === name ? 'active' : ''}
            onClick={() => onFilterChange(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="clear-btn"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
      >
        Clear Completed
      </button>
    </div>
  )
}

export default TodoFilters

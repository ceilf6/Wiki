import React, { useState, useEffect, useMemo } from 'react';

const STORAGE_KEY = 'todolist-items';

const FILTERS = { ALL: 'all', ACTIVE: 'active', COMPLETED: 'completed' };

const styles = {
  container: {
    maxWidth: 520,
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  title: {
    fontSize: 32,
    fontWeight: 300,
    textAlign: 'center',
    color: '#333',
    marginBottom: 24,
  },
  inputRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    fontSize: 16,
    border: '1px solid #ddd',
    borderRadius: 6,
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  addBtn: {
    padding: '10px 20px',
    fontSize: 16,
    background: '#4a90d9',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  filters: {
    display: 'flex',
    gap: 6,
    marginBottom: 16,
    justifyContent: 'center',
  },
  filterBtn: (active) => ({
    padding: '6px 14px',
    fontSize: 13,
    border: '1px solid',
    borderColor: active ? '#4a90d9' : '#ddd',
    borderRadius: 16,
    background: active ? '#4a90d9' : '#fff',
    color: active ? '#fff' : '#666',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }),
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 12,
    cursor: 'pointer',
    accentColor: '#4a90d9',
  },
  text: (done) => ({
    flex: 1,
    fontSize: 16,
    color: done ? '#aaa' : '#333',
    textDecoration: done ? 'line-through' : 'none',
    cursor: 'pointer',
    transition: 'color 0.2s',
  }),
  deleteBtn: {
    padding: '4px 10px',
    fontSize: 13,
    color: '#e74c3c',
    background: 'none',
    border: '1px solid #e74c3c',
    borderRadius: 4,
    cursor: 'pointer',
    opacity: 0.6,
    transition: 'opacity 0.2s',
  },
  stats: {
    marginTop: 16,
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#ccc',
    padding: '40px 0',
    fontSize: 15,
  },
};

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function TodoList() {
  const [todos, setTodos] = useState(loadTodos);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState(FILTERS.ALL);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const filtered = useMemo(() => {
    if (filter === FILTERS.ACTIVE) return todos.filter((t) => !t.done);
    if (filter === FILTERS.COMPLETED) return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.done).length;
    return { total, completed, active: total - completed };
  }, [todos]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [{ id: Date.now(), text, done: false }, ...prev]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>TodoList</h1>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button style={styles.addBtn} onClick={addTodo}>
          Add
        </button>
      </div>

      <div style={styles.filters}>
        {Object.entries({ All: FILTERS.ALL, Active: FILTERS.ACTIVE, Completed: FILTERS.COMPLETED }).map(
          ([label, key]) => (
            <button key={key} style={styles.filterBtn(filter === key)} onClick={() => setFilter(key)}>
              {label}
            </button>
          )
        )}
      </div>

      {filtered.length === 0 ? (
        <div style={styles.empty}>
          {stats.total === 0 ? 'No todos yet. Add one above!' : 'Nothing here.'}
        </div>
      ) : (
        <ul style={styles.list}>
          {filtered.map((todo) => (
            <li key={todo.id} style={styles.item}>
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span style={styles.text(todo.done)} onClick={() => toggleTodo(todo.id)}>
                {todo.text}
              </span>
              <button style={styles.deleteBtn} onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {stats.total > 0 && (
        <div style={styles.stats}>
          {stats.completed} / {stats.total} completed
        </div>
      )}
    </div>
  );
}

export default TodoList;

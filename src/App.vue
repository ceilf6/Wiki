<template>
  <main class="app">
    <section class="todo-card" aria-labelledby="todo-title">
      <header class="todo-header">
        <h1 id="todo-title">Todo List</h1>
        <p>{{ activeCount }} remaining, {{ completedCount }} completed</p>
      </header>

      <form class="todo-form" @submit.prevent="addTodo">
        <input
          v-model="newTodo"
          class="todo-input"
          type="text"
          placeholder="Add a new todo..."
          aria-label="New todo"
        />
        <button class="add-button" type="submit">Add</button>
      </form>

      <div class="filters" role="group" aria-label="Todo filters">
        <button
          v-for="option in filterOptions"
          :key="option.value"
          class="filter-button"
          :class="{ active: filter === option.value }"
          type="button"
          @click="setFilter(option.value)"
        >
          {{ option.label }}
        </button>
      </div>

      <ul v-if="filteredTodos.length" class="todo-list">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="todo-item"
          :class="{ completed: todo.completed }"
        >
          <label class="todo-toggle">
            <input
              type="checkbox"
              :checked="todo.completed"
              :aria-label="`Mark ${todo.title} as ${todo.completed ? 'active' : 'completed'}`"
              @change="toggleTodo(todo.id)"
            />
            <span class="checkbox" aria-hidden="true"></span>
          </label>

          <button class="todo-title" type="button" @click="toggleTodo(todo.id)">
            {{ todo.title }}
          </button>

          <button
            class="delete-button"
            type="button"
            :aria-label="`Delete ${todo.title}`"
            @click="removeTodo(todo.id)"
          >
            Delete
          </button>
        </li>
      </ul>

      <div v-else class="empty-state">
        <strong>No todos found</strong>
        <span>Add a task or change the current filter.</span>
      </div>

      <footer class="todo-footer">
        <span>{{ activeCount }} item{{ activeCount === 1 ? '' : 's' }} left</span>
        <span>{{ todos.length }} total</span>
      </footer>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type Filter = 'all' | 'active' | 'completed'

type Todo = {
  id: number
  title: string
  completed: boolean
}

const todos = ref<Todo[]>([
  { id: 1, title: 'Review Vue 3 basics', completed: true },
  { id: 2, title: 'Build a typed todo list', completed: false },
  { id: 3, title: 'Polish the interface', completed: false },
])

const newTodo = ref('')
const filter = ref<Filter>('all')

const filterOptions: Array<{ value: Filter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

const filteredTodos = computed<Todo[]>(() => {
  if (filter.value === 'active') {
    return todos.value.filter((todo) => !todo.completed)
  }

  if (filter.value === 'completed') {
    return todos.value.filter((todo) => todo.completed)
  }

  return todos.value
})

const activeCount = computed(() => todos.value.filter((todo) => !todo.completed).length)
const completedCount = computed(() => todos.value.filter((todo) => todo.completed).length)

function addTodo(): void {
  const title = newTodo.value.trim()

  if (!title) {
    return
  }

  todos.value.unshift({
    id: Date.now(),
    title,
    completed: false,
  })

  newTodo.value = ''
}

function toggleTodo(id: number): void {
  const todo = todos.value.find((item) => item.id === id)

  if (todo) {
    todo.completed = !todo.completed
  }
}

function removeTodo(id: number): void {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

function setFilter(nextFilter: Filter): void {
  filter.value = nextFilter
}
</script>

<style scoped>
:global(*) {
  box-sizing: border-box;
}

:global(body) {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(96, 165, 250, 0.18), transparent 32rem),
    linear-gradient(135deg, #f8fafc 0%, #eef2f7 100%);
  color: #172033;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

button,
input {
  font: inherit;
}

button {
  -webkit-tap-highlight-color: transparent;
}

.app {
  display: grid;
  min-height: 100vh;
  padding: 48px 20px;
  place-items: center;
}

.todo-card {
  width: min(100%, 640px);
  padding: 28px;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(16px);
}

.todo-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.todo-header h1 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
}

.todo-header p {
  margin: 0 0 6px;
  color: #64748b;
  font-size: 0.95rem;
  white-space: nowrap;
}

.todo-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  margin-bottom: 18px;
}

.todo-input {
  width: 100%;
  min-height: 48px;
  padding: 0 16px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  outline: none;
  background: #ffffff;
  color: #0f172a;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.todo-input::placeholder {
  color: #94a3b8;
}

.todo-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.14);
}

.add-button,
.filter-button,
.delete-button,
.todo-title {
  border: 0;
  cursor: pointer;
}

.add-button:focus-visible,
.filter-button:focus-visible,
.delete-button:focus-visible,
.todo-title:focus-visible,
.todo-toggle input:focus-visible + .checkbox {
  outline: 3px solid rgba(37, 99, 235, 0.28);
  outline-offset: 2px;
}

.add-button {
  min-height: 48px;
  padding: 0 20px;
  border-radius: 12px;
  background: #2563eb;
  color: #ffffff;
  font-weight: 700;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.add-button:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.filter-button {
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid #dbe3ef;
  border-radius: 999px;
  background: #ffffff;
  color: #475569;
  font-weight: 700;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.filter-button:hover,
.filter-button.active {
  border-color: #2563eb;
  background: #eff6ff;
  color: #1d4ed8;
}

.todo-list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-item {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  min-height: 58px;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #ffffff;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.todo-item:hover {
  border-color: #cbd5e1;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  transform: translateY(-1px);
}

.todo-toggle {
  position: relative;
  display: grid;
  width: 24px;
  height: 24px;
  cursor: pointer;
  place-items: center;
}

.todo-toggle input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.checkbox {
  display: block;
  width: 22px;
  height: 22px;
  border: 2px solid #cbd5e1;
  border-radius: 7px;
  background: #ffffff;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.todo-toggle input:checked + .checkbox {
  border-color: #16a34a;
  background: #16a34a;
}

.todo-toggle input:checked + .checkbox::after {
  display: block;
  width: 6px;
  height: 11px;
  margin: 2px auto 0;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  content: "";
  transform: rotate(45deg);
}

.todo-title {
  min-width: 0;
  padding: 0;
  background: transparent;
  color: #172033;
  font-weight: 650;
  line-height: 1.35;
  text-align: left;
  overflow-wrap: anywhere;
}

.todo-item.completed {
  background: #f8fafc;
}

.todo-item.completed .todo-title {
  color: #94a3b8;
  text-decoration: line-through;
}

.delete-button {
  min-height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  background: #fff1f2;
  color: #e11d48;
  font-size: 0.9rem;
  font-weight: 700;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.delete-button:hover {
  background: #e11d48;
  color: #ffffff;
}

.empty-state {
  display: grid;
  gap: 6px;
  padding: 36px 20px;
  border: 1px dashed #cbd5e1;
  border-radius: 14px;
  background: #f8fafc;
  color: #64748b;
  text-align: center;
}

.empty-state strong {
  color: #334155;
  font-size: 1.05rem;
}

.empty-state span {
  overflow-wrap: anywhere;
}

.todo-footer {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 18px;
  color: #64748b;
  font-size: 0.92rem;
  font-weight: 650;
}

@media (max-width: 560px) {
  .app {
    padding: 24px 14px;
    place-items: start center;
  }

  .todo-card {
    padding: 20px;
    border-radius: 16px;
  }

  .todo-header,
  .todo-footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .todo-header {
    gap: 8px;
    margin-bottom: 20px;
  }

  .todo-header h1 {
    font-size: clamp(1.8rem, 12vw, 2.5rem);
  }

  .todo-header p {
    margin-bottom: 0;
    white-space: normal;
  }

  .todo-form {
    grid-template-columns: 1fr;
  }

  .todo-input,
  .add-button {
    min-height: 48px;
  }

  .add-button {
    width: 100%;
  }

  .filters {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .filter-button {
    min-height: 44px;
    padding: 0 10px;
  }

  .todo-item {
    grid-template-columns: 1fr;
    align-items: stretch;
    gap: 10px;
    padding: 12px;
  }

  .todo-toggle {
    position: absolute;
    top: 14px;
    left: 12px;
    width: 28px;
    height: 28px;
  }

  .checkbox {
    width: 24px;
    height: 24px;
  }

  .todo-title {
    min-height: 28px;
    padding-left: 38px;
    padding-right: 4px;
  }

  .delete-button {
    justify-self: start;
    min-height: 42px;
    padding: 0 16px;
  }
}

@media (max-width: 380px) {
  .app {
    padding: 18px 10px;
  }

  .todo-card {
    padding: 16px;
  }

  .filters {
    grid-template-columns: 1fr;
  }

  .filter-button {
    width: 100%;
  }

  .todo-footer {
    gap: 6px;
  }
}
</style>
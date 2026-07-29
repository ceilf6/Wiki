import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('未找到 #root 挂载点')
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

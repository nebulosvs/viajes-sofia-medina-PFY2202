import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from './App.jsx'
import './index.css'

async function iniciarAplicacion() {
  const { worker } = await import('./mocks/browser')


  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      options: {
        scope: import.meta.env.BASE_URL,
      },
    },
  })


  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>
  )
}

iniciarAplicacion().catch((error) => {
  console.error('No fue posible iniciar la aplicación:', error)
})

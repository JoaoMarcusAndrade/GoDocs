
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Router } from './Router'
import { AccessibilityProvider } from './context/AccessibilityContext'
import { ThemeProvider } from './context/ThemeContext'

function App() {

  return (
    <>
      <AccessibilityProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Router />

          </BrowserRouter>
        </ThemeProvider>
      </AccessibilityProvider>

    </>
  )
}

export default App

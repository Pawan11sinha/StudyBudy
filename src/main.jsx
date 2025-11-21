import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
 <link href="/src/style.css" rel="stylesheet"></link>
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <App />
    </BrowserRouter>
    
  </StrictMode>,
)

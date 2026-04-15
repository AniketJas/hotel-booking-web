import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        // default (fallback)
        style: {
          color: "#fff",
          fontWeight: "500",
        },

        success: {
          style: {
            background: "#16a34a", // Tailwind green-600
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#16a34a",
          },
        },

        error: {
          style: {
            background: "#dc2626", // Tailwind red-600
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#dc2626",
          },
        },

        loading: {
          style: {
            background: "#eab308", // Tailwind yellow-500
            color: "#000", // better contrast for yellow
          },
        }
      }}
    />
  </React.StrictMode>,
)

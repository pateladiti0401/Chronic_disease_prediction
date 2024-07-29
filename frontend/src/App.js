import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import DiabetesForm from './components/DiabetesForm'
import HeartForm from './components/HeartForm'
import KidneyForm from './components/KidneyForm' // Import the KidneyForm component
import './App.css' // Import additional styling for the app

function App() {
  return (
    <div className='App'>
      <header className='header'>
        <div className='logo-container'>
          <img
            src='./../../logo.png'
            height='150px'
            alt='LifeShield AI Logo'
            className='logo'
          />
        </div>
        <nav>
          <ul>
            <li>
              <Link to='/diabetes'>Diabetes Prediction</Link>
            </li>
            <li>
              <Link to='/heart'>Heart Disease Prediction</Link>
            </li>
            <li>
              <Link to='/kidney'>Chronic Kidney Disease Prediction</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path='/diabetes' element={<DiabetesForm />} />
          <Route path='/heart' element={<HeartForm />} />
          <Route path='/kidney' element={<KidneyForm />} />{' '}
          {/* Add route for KidneyForm */}
        </Routes>
      </main>
      <footer className='footer'>
        <p>&copy; 2024 LifeShield AI. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App

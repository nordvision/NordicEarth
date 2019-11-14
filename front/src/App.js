import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css'
import Header from './Header'
import MapPage from './pages/MapPage'
import InstructionsPage from './pages/InstructionsPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/" render={() => <HomePage />} />
        <Route exact path="/instructions" render={() => <InstructionsPage />} />
        <Route exact path="/maps" render={() => <MapPage />} />
      </Router>
    </div>
  )
}

export default App

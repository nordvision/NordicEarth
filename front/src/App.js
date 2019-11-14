import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {
  Route
} from 'react-router-dom'

import './App.css'
import Header from './Header'
import MapPage from './pages/MapPage'
import InstructionsPage from './pages/InstructionsPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path="/" render={() => <MapPage />} />
        <Route exact path="/instructions" render={() => <InstructionsPage />} />
      </Router>
    </div>
  )
}

export default App

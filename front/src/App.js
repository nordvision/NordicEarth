import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css'
import GroupMap from './pages/GroupMap'
import MapPage from './pages/MapPage'
import InstructionsPage from './pages/InstructionsPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/groupmap" component={GroupMap} />
        <Route path="/instructions" component={InstructionsPage} />
        <Route path="/maps" component={MapPage} />
        <Route exact path="/" component={HomePage} />
      </Router>
    </div>
  )
}

export default App

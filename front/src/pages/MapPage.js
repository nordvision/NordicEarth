import React, { Component } from 'react'
import ThreeModule from '../ThreeModule'

class MapPage extends Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
  }

  componentDidMount() {
    new ThreeModule(this.mapRef) // eslint-disable-line no-new
  }

  render() {
    return <div ref={this.mapRef}> </div>
  }
}

export default MapPage

import React, { Component } from 'react';
import proj4 from 'proj4';
import ThreeModule from '../ThreeModule';

class MapPage extends Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
  }

  componentDidMount() {
    const queryparams = new URLSearchParams(window.location.search);
    const gpsParam = queryparams.get('gps');
    let coordinate;
    if (gpsParam) {
      const [north, east] = gpsParam.split(',').map((str) => parseFloat(str));

      const secondProjection = '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs '
      coordinate = proj4('EPSG:4326',secondProjection).forward([east, north]).map((float) => Math.round(float))
      
      console.log(coordinate)
    }
    new ThreeModule(this.mapRef, coordinate); // eslint-disable-line no-new
  }

  render() {
    return <div ref={this.mapRef}> </div>
  }
}

export default MapPage

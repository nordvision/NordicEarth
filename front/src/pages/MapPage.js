import React, { Component } from "react";
import ThreeModule from "../ThreeModule";

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    new ThreeModule({
      ref: this.mapRef.current,
      displacementScale: 2000,
      imageMap: "./data/91250-6973750.jpg", // "./data/team1_bw.png",
      textureMap: "./data/91250-6973750.png" //"./data/team1.png"
    });
  }

  render() {
    return <div ref={this.mapRef}> </div>;
  }
}

export default MapPage;

import React, { Component } from "react";
import ThreeModule from "../ThreeModuleBonus";

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    new ThreeModule({
      ref: this.mapRef.current,
      displacementScale: 200,
      imageMap: "./data/team1.png",
      textureMap: "./data/team1_bw.png"
      // groundPosX: 0,
      // groundPosY: 0,
      // groundPosZ: 0
    });
  }

  render() {
    return <div ref={this.mapRef}> </div>;
  }
}

export default MapPage;

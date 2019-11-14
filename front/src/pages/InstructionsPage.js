import React from 'react'

import './InstructionsPage.scss'
import Header from '../Header'

/* eslint-disable max-len */

function InstructionsPage() {
  return (
    <div>
      <Header />
      <div className="InstructionsPage">
        <h1>Getting things done</h1>
        <h2>How to prepare the data files</h2>
        <ol>
          <li>Download height data (from your local mapping agency, probably).</li>
          <li>Download satellite data (from your local mapping agency, or ESA: https://apps.sentinel-hub.com/eo-browser/).</li>
          <li>Download three.js to create a visualization where you load the height and satellite data and show them as seen from a given camera location.</li>
        </ol>
        <h2>What can you do with GDAL</h2>
        <ul>
          <li>Extract only the region you are interested in.</li>
          <li>Make satellite and height data match (i.e. cover the same area).</li>
          <li>Use GDAL to convert the height data to a simple format (e.g. PNG) for presentation in the browser.</li>
          <li>Convert the satellite data to simple format (e.g. JPG) for presentation in the browser.</li>
        </ul>
        <h2>Short introduction to GDAL</h2>
        <ul>
          <li>GDAL can convert and manipulate all kinds of geographical data.</li>
          <li>Download it <a href="https://gdal.org/download.html#binaries">here</a>.</li>
          <li>To get an overview of all the programs contained inside GDAL check <a href="https://gdal.org/programs/index.html">here</a>.</li>
          <li>It can read _many_ <a href="https://gdal.org/drivers/raster/index.html">data formats</a>.</li>
        </ul>
        <h2>Tips</h2>
        <ul>
          <li>Use `gdalinfo` to extract information about files, and to see whether GDAL can understand the file.</li>
          <li>Use `gdal_translate` to extract a given region from a large file.</li>
          <li>Here is an example of a full command line converting a GeoTIFF height data file to a png file:</li>
          <p>`gdal_translate -of png -ot Byte -scale 0 2550 0 255 -srcwin start_x_coordinate start_y_coordinate num_output_pixels_x num_output_pixels_y input.tif output.png`</p>
        </ul>
        <h2>Explanation of the parameters</h2>
        <ul>
          <li>`-of png` is there to tell gdal that the output file will be a png.</li>
          <li>`-ot Byte` is there to restrict the height data to 1 byte per height value. This is to ensure that we end up with a png that store height values in the range of 0 to 255. Ie an 8-bit png file.</li>
          <li>`-scale 0 2550 0 255` is there to map the input heights (in this case: in the range from 0 to 2550 meters) to an output range (of 0 to 255). This in order to match the range limitations of an 8-bit png file.</li>
          <li>`-srcwin start_x_coordinate start_y_coordinate num_output_pixels_x num_output_pixels_y tells` where to start extracting height values (using the coordinate system that the source file is using), and how many height values to extract in the x and y direction.</li>
          <li>`input.tif` the input file name.</li>
          <li>`output.png` the output file name.</li>
        </ul>
      </div>
    </div>
  )
}

export default InstructionsPage

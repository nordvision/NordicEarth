import React from "react";

import "./InstructionsPage.scss";
import Header from "../Header";

/* eslint-disable max-len */

function InstructionsPage() {
  return (
    <div>
      <Header />
      <div className="InstructionsPage">
        <div className="InstructionsPage_inner">
          <h1>Do it yourself</h1>
          <h2>How to prepare data files</h2>
          <ol>
            <li>
              Download height data (from your local mapping agency, probably).
            </li>
            <li>
              Download satellite data (from your local mapping agency, or{" "}
              <a href="https://apps.sentinel-hub.com/eo-browser/">ESA</a>).
            </li>
          </ol>
          <h2>Working with GDAL</h2>
          <ul>
            <li>Extract only the region you are interested in.</li>
            <li>
              Make satellite and height data match (i.e. cover the same area).
            </li>
            <li>
              Use GDAL to convert the height data to a simple format (e.g. PNG)
              for presentation in the browser.
            </li>
            <li>
              Convert the satellite data to simple format (e.g. JPG) for
              presentation in the browser.
            </li>
          </ul>
          <h2>Introduction to GDAL</h2>
          <ul>
            <li>
              GDAL can convert and manipulate all kinds of geographical data.
            </li>
            <li>
              Download GDAL{" "}
              <a href="https://gdal.org/download.html#binaries">here</a>.
            </li>
            <li>
              To get an overview of all the programs contained inside GDAL check{" "}
              <a href="https://gdal.org/programs/index.html">here</a>.
            </li>
            <li>
              It can read <strong>many</strong>{" "}
              <a href="https://gdal.org/drivers/raster/index.html">
                data formats
              </a>
              .
            </li>
          </ul>
          <h2>Tips</h2>
          <ul>
            <li>
              Use <strong>gdalinfo</strong> to extract information about files,
              and to see whether GDAL can understand the file.
            </li>
            <li>
              Use <strong>gdal_translate</strong> to extract a given region from
              a large file.
            </li>
          </ul>
          <h2>Using GDAL - part 1</h2>
          <ul>
            <li>
              Here is an example of a full command line converting a GeoTIFF
              height data file to a png file:
            </li>
            <p>
              <strong>
                gdal_translate -of png -ot Byte -scale 0 2550 0 255 -srcwin
                start_x_coordinate start_y_coordinate num_output_pixels_x
                num_output_pixels_y input.tif output.png
              </strong>
            </p>
          </ul>
          <h2>Explanation of the parameters</h2>
          <ul>
            <li>
              <strong>-of png</strong> is there to tell gdal that the output
              file will be a png.
            </li>
            <li>
              <strong>-ot Byte</strong> is there to restrict the height data to
              1 byte per height value. This is to ensure that we end up with a
              png that store height values in the range of 0 to 255. Ie an 8-bit
              png file.
            </li>
            <li>
              <strong>-scale 0 2550 0 255</strong> is there to map the input
              heights (in this case: in the range from 0 to 2550 meters) to an
              output range (of 0 to 255). This in order to match the range
              limitations of an 8-bit png file.
            </li>
            <li>
              <strong>
                -srcwin start_x_coordinate start_y_coordinate
                num_output_pixels_x num_output_pixels_y tells
              </strong>{" "}
              where to start extracting height values (using the coordinate
              system that the source file is using), and how many height values
              to extract in the x and y direction.
            </li>
            <li>
              <strong>input.tif</strong> the input file name.
            </li>
            <li>
              <strong>output.png</strong> the output file name.
            </li>
          </ul>
          <h2>Using GDAL - part 2</h2>
          <ul>
            <li>
              To use matching satellite imagery, first download a Sentinel zip
              file. For example, from: https://apps.sentinel-hub.com/eo-browser/
              Unzip the file. There should be a subdirectory called GRANULE
              there. Go there, and to its subdirectory (having a long, cryptic
              name, like L1C_T33UUB_A013819_20191029T102039), and go to the
              IMG_DATA subdirectory beneath it.
            </li>
            <li>
              The file that ends with TCI.jp2 has the natural color information.
              This is a file in JPEG2000 format, something which GDAL
              unfortunately is not able to read.
            </li>
            <li>
              A solution could be to try to convert the jp2 file to a different
              file format (for example GeoTIFF) and read out the projection
              information (the text which is shown when you use `gdalinfo` on a
              file). The Preview application is macOS can read the jp2 file and
              write a TIFF file. And then apply the projection information onto
              the TIFF file.
            </li>
            <li>
              The idea is then to extract the extents information from the
              height data source file and reapply the same extents information
              onto the satellite data file. This way they will match.
              `gdal_translate` and the `-projwin ` option should be used to crop
              the input image to spesific geographical coordinates.
            </li>
            <li>
              We did not succeed in extracting and matching raw Sentinel data.
            </li>
            <li>
              Final note: The satellite image size should preferably be somewhat
              higher than the height map - for example 1024 by 1024 pixels. We
              did not succeed in extracting and matching raw Sentinel data.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InstructionsPage;

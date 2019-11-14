HOWTO
=====

The overall process is:

- Download height data (from your local mapping agency, probably)
- Download satellite data (from your local mapping agency, or ESA: https://apps.sentinel-hub.com/eo-browser/)
- Use GDAL to
  -- extract only the region you are interested in
  -- make satellite and height data match (ie cover the same area)
- Use GDAL to
  -- convert the height data to a simple format (f.ex PNG) for presentation in the browser
  -- convert the satellite data to simple format (f.ex JPG) for presentation in the browser
- Use three.js to
  -- create an app where you load the height and satellite data and show them as seen from a given camera location


INTRODUCTION TO GDAL
====================

GDAL can convert and manipulate all kinds of geographical data.

* It is available from here: https://gdal.org/
* Downloads are here: https://gdal.org/download.html#binaries
* To get an overview of all the programs contained inside GDAL: https://gdal.org/programs/index.html
* It can read _many_ data formats: https://gdal.org/drivers/raster/index.html

Tips:

- Use `gdalinfo` to extract information about files, and to see whether GDAL can understand the file
- Use `gdal_translate` to extract a given region from a large file

Here is an example of a full command line converting a GeoTIFF height data file to a png file:

`gdal_translate -of png -ot Byte -scale 0 2550 0 255 -srcwin start_x_coordinate start_y_coordinate num_output_pixels_x num_output_pixels_y input.tif output.png`

Explanation of the parameters:

* `-of png` is there to tell gdal that the output file will be a png.
* `-ot Byte` is there to restrict the height data to 1 byte per height value. This is to ensure that we end up with a png that store height values in the range of 0 to 255. Ie an 8-bit png file.
* `-scale 0 2550 0 255` is there to map the input heights (in this case: in the range from 0 to 2550 meters) to an output range (of 0 to 255). This in order to match the range limitations of an 8-bit png file.
* `-srcwin start_x_coordinate start_y_coordinate num_output_pixels_x num_output_pixels_y tells` where to start extracting height values (using the coordinate system that the source file is using), and how many height values to extract in the x and y direction
* `input.tif` the input file name
* `output.png` the output file name

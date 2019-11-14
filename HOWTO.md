# HOWTO

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

# INTRODUCTION TO GDAL

GDAL can convert and manipulate all kinds of geographical data.

- It is available from here: https://gdal.org/
- Downloads are here: https://gdal.org/download.html#binaries
- To get an overview of all the programs contained inside GDAL: https://gdal.org/programs/index.html
- It can read _many_ data formats: https://gdal.org/drivers/raster/index.html

Tips:

- Use `gdalinfo` to extract information about files, and to see whether GDAL can understand the file
- Use `gdal_translate` to extract a given region from a large file

# USING GDAL - PART 1

Here is an example of a full command line converting a GeoTIFF height data file to a png file:

`gdal_translate -of png -ot Byte -scale 0 2550 0 255 -srcwin start_x_coordinate start_y_coordinate num_output_pixels_x num_output_pixels_y input.tif output.png`

Explanation of the parameters:

- `-of png` is there to tell gdal that the output file will be a png.
- `-ot Byte` is there to restrict the height data to 1 byte per height value. This is to ensure that we end up with a png that store height values in the range of 0 to 255. Ie an 8-bit png file.
- `-scale 0 2550 0 255` is there to map the input heights (in this case: in the range from 0 to 2550 meters) to an output range (of 0 to 255). This in order to match the range limitations of an 8-bit png file.
- `-srcwin start_x_pixel start_y_pixel num_x_pixels num_y_pixels` tells where to start extracting height values from the source file, and how many height values to extract in the x and y direction
- `input.tif` the input file name
- `output.png` the output file name

# USING GDAL - PART 2

To use matching satellite imagery, first download a Sentinel zip file. For example, from: https://apps.sentinel-hub.com/eo-browser/

Unzip the file. There should be a subdirectory called GRANULE there. Go there, and to its subdirectory (having a long, cryptic name, like L1C_T33UUB_A013819_20191029T102039), and go to the IMG_DATA subdirectory beneath it.

The file that ends with TCI.jp2 has the natural color information. This is a file in JPEG2000 format, something which GDAL unfortunately is not able to read.

The best solution is to try to convert the jp2 file to a different file format (for example GeoTIFF) and read out the projection information (the text which is shown when you use `gdalinfo` on a file) - and apply that onto the GeoTIFF file and work from there.

The basic idea is to reuse the projection and extents information from the height data source file and apply the same extents information onto the satellite data file. This way they will match.

The satellite image size should preferably be somewhat higher than the height map - for example 1024 by 1024 pixels.

We did not succeed in extracting and matching Sentinel data. The general technique is to use `gdal_translate` and the `-projwin <ulx> <uly> <lrx> <lry>` option to crop the input image to spesific geographical coordinates.

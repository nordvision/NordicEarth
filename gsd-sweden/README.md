
# Sweden

## Getting Heightmap

### Prerequisites 

- Account on Lantmäteriet Open Data
- GDAL installed

### Preparing data

Lantmäteriet Open Data Höjddata

This is a 50 m grid height map in GeoTIFF format.

https://www.lantmateriet.se/sv/Kartor-och-geografisk-information/oppna-data/?faq=b47b

1. Login to ftp://download-opendata.lantmateriet.se/GSD-Hojddata_grid_50_plus/nh/
2. Download the ZIP for your desired region
3. Extract the zip and put the files in `./tif`
4. Run `gdalbuildvrt topography.vrt tif/*.tif`
5. Run `gdalinfo topography.vrt`. In the output, find *Corner Coordinates:* and copy the min and max X and Y values (not longitude/latitude numbers)
6. Put the copied numbers into `tiles_min_x`, `tiles_max_x`, `tiles_min_y`, `tiles_max_y`
7. Create an empty `./topography` directory

### Generating PNGs

1. Run `create_topography.sh`. It will take a while.
2. Check `./topography` to see the PNGs. Some may be blank.
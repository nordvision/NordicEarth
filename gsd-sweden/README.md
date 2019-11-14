
# Sweden

## Getting Topography

### Prerequisites 

- Account on Lantmäteriet Open Data (https://www.lantmateriet.se/sv/Kartor-och-geografisk-information/oppna-data/)
- GDAL installed

### Preparing data

Lantmäteriet Open Data Höjddata

This is a 50 m grid height map in GeoTIFF format.

https://www.lantmateriet.se/sv/Kartor-och-geografisk-information/oppna-data/?faq=b47b

1. Login to ftp://download-opendata.lantmateriet.se/GSD-Hojddata_grid_50_plus/nh/
2. Download the ZIP for your desired region
3. Extract the zip and put the files in `./heightmap`
4. Run `gdalbuildvrt topography.vrt heightmap/*.tif`
5. Run `gdalinfo topography.vrt`. In the output, find *Corner Coordinates:* and copy the min and max X and Y values (not longitude/latitude numbers)
6. Put the copied numbers into `tiles_min_x`, `tiles_max_x`, `tiles_min_y`, `tiles_max_y` in `create_topography.sh`
7. Create an empty `./topography` directory

### Generating PNGs

1. Run `create_topography.sh`. It will take a while.
2. Check `./topography` to see the PNGs. Some may be blank.

## Getting Texture

### Prerequisites

- An account on Lantmäteriet Saccess (https://saccess.lantmateriet.se/). It will take a few minutes to create the account. Note: you have to supply an adress to prove residency
- GDAL installed

### Preparing data

1. Login to Saccess
2. Use Sökning to find the area you are interested in
3. Select the Resultat tab and find images that match your area. Note: each file is at least 400 MB
4. Place the items in your Kundkorg, the click Lägg order
5. Wait for the download to be ready. This can take several minutes.
6. Download the file via the link you are emailed or the Ordrar tab on Saccess
7. Extract the zip and put the files in `./satellite`
8. Put the `tiles_min_x` etc values from the topography preparation into `create_texture.sh`
9. Create an empty `./texture` directory

### Generating JPGs

1. Run `create_texture.sh`. It will take a while.
2. Check `./texture` to see the JPGs. Some may be blank.
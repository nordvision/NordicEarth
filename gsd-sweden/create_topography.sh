#!/bin/bash

# create virtual file representing the whole data set
gdalbuildvrt topography.vrt tif/*.tif

# one tile is NxN data points
tile_size=256

# distance between data points, in meters
resolution=50

# width and height of a single tile, in meters
((tile_extents = ( tile_size - 1 ) * resolution))

# set UTM coordinates of the tile set extents (whole of norway)
tiles_min_x=600000
tiles_min_y=6400000
tiles_max_x=800000
tiles_max_y=6700000

# quantize heights to 10 meter so values fit in a single byte
# so we can use grayscale PNGs to store height maps
common_params="-ot Byte -strict -a_nodata 0 -of png -scale 0 2469 0 247"

for ((x=$tiles_min_x; x<=$tiles_max_x; x+=tile_extents))
do
	for ((y=$tiles_min_y; y<=$tiles_max_y; y+=tile_extents))
	do
        # calculate the UTM coordinates of the remaining corner points
        # add extra row and column since last row/column in this tile must equal first row/column of next tile
        ((top_left_y = y + tile_extents + resolution))
        ((bottom_right_x = x + tile_extents + resolution))
        gdal_translate $common_params -projwin $x $top_left_y $bottom_right_x $y topography.vrt topography/$x-$y.png
        rm topography/$x-$y.png.aux.xml
	done
done

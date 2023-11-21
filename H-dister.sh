#!/bin/sh
# bash file to be run on the root directory

# adding the date variable
now=`date`

echo " -- Hositnger Files Requested At $now -- "

echo "-- ARRANGING FILES --"

#checking if H-dist folder is available 
DIR="./H-dist"

if [ -d "$DIR" ]; then
  ### exists ###
  echo "$DIR located"
else
  ###  does NOT exists ###
  mkdir -p "$DIR"
  echo "$DIR created"
fi

# starting shopt extglob
shopt -s extglob
# change directory to Hostinger's deployment folder
cd "$DIR/"
# removing all folders 
rm -r */
# removing all files except for rewrite rules 
rm -v !(".htaccess")
# ending shopt extglob
shopt -u extglob
# coppying all files from the dist folder to current folder 
cp -r ../dist/* ./

echo "-- PREPARING FILES FOR HOSTINGER --"

# changing index from html to php to work on Hostinger's server
mv index.html index.php

cd ..

echo "-- READY TO COMMIT AND PUSH :D --"

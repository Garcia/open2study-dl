#!/bin/bash

casperjs open2study.js $1 $2 $3 > videos.txt
youtube-dl --write-srt --srt-lang en -a videos.txt

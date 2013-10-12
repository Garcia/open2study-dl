open2study-dl
=============

## Requirements ##
* youtube-dl
* casperjs

## How to use ##
```
$ ./open2study.sh googleUser googlePass courseUrl
```

## How it Works ##
First will login in google with your account
After will login in the Open2Study with your google account
Therefore will crawl in the course page to identify the youtube url's
And then youtube-dl will download all the videos for you

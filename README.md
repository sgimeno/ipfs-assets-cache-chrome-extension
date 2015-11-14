IPFS assets cache Chrome Extension
=======================

####Setup

```
>npm install
>source env.sh
```


####Gulp tasks

 + `clean`: deletes the `dist` directory
 + `build`: builds the app using `js` and `html` tasks
  + `js`: browserify bundle
  + `html`: copy HTML files to `dist`
  + `assets`: copies icon.png and manifest.json `dist`
 + `watch`: watch HTML & JS files with watchify


####TODO:

 + Add tests
 + Improve gulp build code

####References

 + [browserify](http://browserify.org/)
 + [Gulp + browserify](http://viget.com/extend/gulp-browserify-starter-faq)

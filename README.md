# OML-Engine
[![npm version](https://badge.fury.io/js/oml-engine.svg)](https://badge.fury.io/js/oml-engine)

## Usage

### Script

Download the [minified script](build/OML.min.js) or [uncompressed script](build/OML.js) and include it in your HTML.  

This code show OML Object into `#oml-view`.  
You can see more details about OML from [here](http://oml.cynack.com/).

```html
<style>
  html, body, #oml-view {
    height: 100%;
  }
</style>
<div id="oml-view"></div>
<script src="OML.min.js"></script>
<script>
  var omlData = {
    "version": "^0.0.1",
    "group":[{
      "component": "@halfo",
      "pos": [0,0,6]
    },{
      "component": "@halfo",
      "pos": [0,3.0253,6],
      "rot": [0,0,180]
    }],
    "define": {
      "@halfo": {
        "group": [{
          "component": "@cube",
          "scale": [2,0.5,0.5],
          "pos": [0.51265,2.7753,0],
          "color": "#FF0000"
        },{
          "component": "@cube",
          "scale": [0.5,2,0.5],
          "pos": [1.26265,2.0253,0],
          "color": "#FF0000"
        },{
          "component": "@cube",
          "scale": [0.5,1.45,0.5],
          "pos": [0.813325,0.686325,0],
          "color": "#FF0000",
          "rot": [0,0,-45]
        }]
      }
    }
  }
  var omlView = new OML(document.getElementById("oml-view"), omlData)
</script>
```

### npm

If you are using a build tool like browserify or webpack, install it via npm.

```sh
$ npm install --save cynack/oml-engine
```

You can use like this.
```js
const OML = require('oml-engine')
```
```js
new OML(document.getElementById("oml-view"), omlData)
```
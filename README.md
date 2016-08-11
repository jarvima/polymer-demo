# polymer-demo

## get started

In a working directory create a `bower.json` file to pull in the Polymer dependencies.

```javascript
{
  "name": "polymer-demo",
  "dependencies": {
    "webcomponentsjs": "webcomponents/webcomponentsjs#~0.7.22 ",
    "polymer": "polymer/polymer#~1.6.1",
  },
}
```

Then run:
```
bower install
```

This will create a bower_components directory and add the dependencies listed in `bower.json`.

Create a minimal `index.html` that will host our app.
```html
<html>
  <head>
    <link rel="import" href="mj-demo-app.html">
  </head>
  <body>
    <mj-demo-app></mj-demo-app>
  </body>
</html>
```

Note the html import of `mj-demo-app.html`.

Create that file now.
```html
<link rel="import" href="bower_components/polymer/polymer.html">

<dom-module id="mj-demo-app">
  <style>
    .main {
      padding: 40px;
      font-family: Helvetica, Arial;
      color: #667755;
    }
  </style>
  
  <template>
    <div class="main">
      Hello Polymer Demo!
    </div>
  </template>
  
  <script>
    Polymer({
      is: 'mj-demo-app',
      
      ready: function() {
        console.log('Logging from Polymer!');
      }
    });
  </script>
</dom-module>
```

Now if you pull up `index.html` in Chrome you'll see a CORS policy violation in the console.  Html imports need to come from the same origin.

To fix this you can run a local server. From your working directory run:
```
python -m SimpleHTTPServer
```
And then in Chrome navigate to:
```
http://localhost:8000/index.html
```

Our page still doesn't display anything in Firefox and other browsers that don't yet support WebComponents.
To fix this add the following to the body content in `index.html`:
```html
  <script>
    if (!('registerElement' in document) || !('import' in document.createElement('link')) 
    || !('content' in document.createElement('template'))) {
      var e = document.createElement('script');
      e.src = 'bower_components/webcomponentsjs/webcomponents-lite.min.js';
      document.body.appendChild(e);
    }
  </script>
```

It should be working in Firefox now.  Congratulations on creating a Polymer WebComponent.

Now lets add a child WebComponent.
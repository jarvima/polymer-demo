# polymer-demo

## create a service element

Polymer has some great elements like `iron-ajax` to fetch data.  But let's say, for whatever reason, that our team has decided to use a library called `slim-xhr`. I've included it in the repo. (It's really not a popular library.  It's only used for this demo.)

Let's wrap `slim-xhr` in a WebComponent so it can be easily re-used.

It will look like this:
```html
  <link rel="import" href="bower_components/polymer/polymer.html">
  <script src="slim-xhr.js"></script>

  <dom-module id="mj-slim-service">
    <script>
      Polymer({
        is: 'mj-word',

        get: slim.get,
        post: slim.post,
        put: slim.put,
        delete: slim.delete
      });
    </script>
  </dom-module>
```

Pretty simple, we've basically just `adapted` `slim-xhr` to work as a Polymer WebComponent.  Also notice that there is no `style` or `template` section.  `mj-slim-service` won't render anything.  It's a strange concept at first (having an element that doesn't render) but once you get used to it, it's pretty cool and keeps uniformality.  In Polymer, everything is an element.

## use the service

Now let's use the service to get our word definitions in `mj-word`.

Add the service element to the template in `mj-word`:
```html
  <template>
    <mj-slim-service id="slim"></mj-slim-service>

    ...

  </template>
```

The `id` can be used to access the element with Polymer's automatic node finding.  In the element's functions, `this.$.slim` will give you a reference to the node.

Don't forget the html import:
```html
  <link rel="import" href="mj-slim-service.html">
```

Now let's modify `_handleKeydown` to use the service:
```js
  _handleKeydown: function(event) {
    if (event.keyCode != 13) return;
    if (!this.word) return;

    var element = this;
    var wordUrl = 'http://localhost:5040/word/' + this.word;

    element.$.slim.get(wordUrl).then(function(result) {
      var definition = result.responseData.definition;
      if (definition) {
        element.definition = definition;
      }
      else {
        element.definition = 'Word not found.';
      }
    },
    function(error) {
      console.log('error getting word:', error);
    });
  }
```

You will need to set up a local server or hit some other service that serves up word definitions.  Besides that minor detail, our element should now be displaying definitions from the service.

## extract an element

But `mj-word` looks a little messy to me.  That url in a display element looks like it should go into a service element.  Let's split it into two elements; one that displays the data and one that fetches the data.

We extract `mj-word-service`:
```html
  <link rel="import" href="bower_components/polymer/polymer.html">
  <link rel="import" href="mj-slim-service.html">

  <dom-module id="mj-word-service">
    <template>
      <mj-slim-service id="slim"></mj-slim-service>
    </template>
    <script>
      Polymer({
        is: 'mj-word-service',

        getDefinition: function(word) {
          var element = this;
          var wordUrl = 'http://localhost:5040/word/' + word;

          return element.$.slim.get(wordUrl).then(function(result) {
            return result.responseData.definition;
          },
          function(error) {
            console.log('error getting word:', error);
            return null;
          });
        }
      });
    </script>
  </dom-module>
```

And now `mj-word` looks like this
```html
<link rel="import" href="bower_components/polymer/polymer.html">
<link rel="import" href="mj-word-service.html">

<dom-module id="mj-word">

  ...

  <template>
    <mj-word-service id="word"></mj-word-service>
    
    ...
    
  </template>

  <script>
    Polymer({
      is: 'mj-word',

      ...

      _handleKeydown: function(event) {
        if (event.keyCode != 13) return;
        if (!this.word) return;

        var element = this;
        
        element.$.word.getDefinition(element.word).then(function(definition) {
          if (definition) {
            element.definition = definition;
          }
          else {
            element.definition = 'Word not found.';
          }
        });
      }
    });
  </script>
</dom-module>
```

Now our elements feel cleaner and the system still works as expected.

I hope you now have a solid base to start creating your own Polymer WebComponents.  Good luck.

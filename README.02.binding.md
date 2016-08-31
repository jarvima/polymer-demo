# polymer-demo

## data binding

Let's create a new element that has some data binding. The shell will look like this:
```html
  <dom-module id="mj-word">
    <style>
      .container {
        margin: 10px;
        padding: 10px;
        border: 2px solid #445577;
        display: inline-block;
        width: 280px;
      }
      .container p {
        margin: 0;
        padding: 10px 0;
        min-height: 30px;
        font-size: 20px;
        line-height: 28px;
      }
      .word {
        border-bottom: 1px solid #445577;
      }
    </style>

    <template>
      <span class="container">
        <p class="word">[[word]]</p>
        <p>[[definition]]</p>
      </span>
    </template>

    <script>
      Polymer({
        is: 'mj-word',

        properties: {
          word: {
            type: String,
            value: 'rhombus'
          },
          definition: {
            type: String,
            value: 'An equilateral parallelogram.'
          }
        }
      });
    </script>
  </dom-module>
```
Notice `[[word]]` and `[[definition]]` in the template surrounded by double, square brackets.  We could view these as placeholders.  Polymer will replace the placeholders with the respective values from the element's `word` and `definition` properties.

Also notice the new `properties` object in the prototype we're passing to the Polymer function.  The `properties` object tells Polymer what properties to manage and how to manage them. Our first case is pretty simple.  We tell Polymer to keep track of a String `word` and we give it a default value of 'rhombus'.  And we do similarly with `definition`.

Now add an `mj-word` element to the bottom of the `mj-demo-app`:
```html
  <mj-block class="boring">
    <span class="title">Title three</span>
    <span content>Content cohesive to title three.</span>
  </mj-block>
  <mj-word></mj-word>
```

And don't forget the html import at the top:
```html
  <link rel="import" href="mj-word.html">
```
You should see the new element with the default values interpolated at the expected points.


## two-way data binding

That works very well, however, most of the time we need to display dynamic data.  Let's start by setting up `word` to be read from an input.

Add some style:
```html
  input {
    width: 100%;
    line-height: 20px;
    font-size: 16px;
  }
```

Add an input element with the value of `{{word::input}}`:
```html
  <template>
    <span class="container">
      <input type="text" value="{{word::input}}"></input>
      <p class="word">[[word]]</p>
      <p>[[definition]]</p>
    </span>
  </template>
```

Now when we view the element the text field is populated with `rhombus`, the default value for `word`.  And our placeholder `[[word]]` is also updated whenever we update the input value.  We've successfully set up simple two-way data binding.

The `{{word::input}}` tells polymer to map the `word` property value to the input value and update the value of the `word` property when the input fires input events.

## change observer

Our element looks a little strange when we change the value of the input and the `rhombus` definition is still displayed.  Let's fix that with a change observer.

Update the word property definition:
```js
  word: {
    type: String,
    value: 'rhombus',
    observer: '_wordChanged'
  },
```
This tells Polymer to run the elements `_wordChanged` function whenever the value of `word` is updated.

Add the `_wordChanged` function to the prototype object:
```js
  Polymer({
    is: 'mj-word',

    properties: {
      word: {
        type: String,
        value: 'rhombus',
        observer: '_wordChanged'
      },
      definition: {
        type: String,
        value: 'An equilateral parallelogram.'
      }
    },

    _wordChanged: function(newValue, oldValue) {
      if (!oldValue) return;
      this.definition = '';
    }
  });
```

We have to add the `if (!oldValue)` check since `_wordChanged` is called when the default value is set during element initialization.

## key down listener

Nothing happens when we hit the enter key.  Let's change that and add a key press listener.

Add a `on-keydown` property to the text input:
```html
  <input type="text" value="{{word::input}}" on-keydown="_handleKeydown"></input>
```
This tells Polymer to call the element's `_handleKeydown` function whenever the input fires a `keydown` event.

Add the `_handleKeydown` function to the prototype object:
```js
  _wordChanged: function(newValue, oldValue) {
    if (!oldValue) return;
    this.definition = '';
  },

  _handleKeydown: function(event) {
    if (event.keyCode != 13) return;

    var definition = words[this.word];
    if (definition) {
      this.definition = definition;
    }
    else {
      this.definition = 'Word not found.';
    }
  }
```

And we'll need some dummy data for now.  Throw some dummy data into the elements script tag:
```html
  <script>
    var words = {
      rhombus: 'An equilateral parallelogram.',
      trapezoid: 'A quadrilateral having two parallel sides.',
      cube: 'A cubicle, used for work or study.',
      polygon: 'A closed plane figure bounded by three or more line segments.',
      pentagon: 'A five-sided building near Washington, D.C.',
    };
    
    Polymer({

      ...

    });
  </script>
```

Now when you change the input value and hit `enter` the displayed definition will change.  If the word is in out dummy data then it will display the definition. Otherwise it will display 'Word not found.'

But dummy data is only good for demos.

Let's create a service to fetch the word definitions. [[continue]](https://github.com/jarvima/polymer-demo/blob/master/README.03.service.md)
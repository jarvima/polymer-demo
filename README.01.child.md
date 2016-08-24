# polymer-demo

## create a child element

The child element will look a lot like our app element.

```html
  <link rel="import" href="bower_components/polymer/polymer.html">

  <dom-module id="mj-block">
    <style>
      .block {
        margin: 10px;
        padding: 10px;
        border: 2px solid #445577;
        display: inline-block;
        width: 280px;
      }
    </style>

    <template>
      <span class="block">
        I'm a child element.
      </span>
    </template>

    <script>
      Polymer({
        is: 'mj-block',
      });
    </script>
  </dom-module>
```

Now we'll need to reference it from the app element.

In `mj-demo-app.html` html import it so the browser knows about our new element.
```html
  <link rel="import" href="mj-block.html">
```
Now change the `template` in `mj-demo-app.html` to reference it a few times.
```html
  <template>
      <div class="main">
        <mj-block></mj-block>
        <mj-block></mj-block>
        <mj-block></mj-block>
      </div>
  </template>
```

In the browser we can see the three elements. But `mj-block` is a bit boring.  Let's fix it up a bit.

Add some content:
```html
  <span class="block">
    <h3>Child element title.</h3>
    I'm a child element and this is my content.
  </span>
```

And some style:
```html
  .block h3 {
    padding: 4px;
    margin: 0 0 8px;
    font-weight: normal;
    background-color: #dcdfd7;
    border-bottom: 1px solid #445577;
  }
```

Now our element is a little less bland but all three rendered elements are the same.  

## create a template

It could be more useful if our element acted as a template.
This can be done with the `content` tag.

Update `mj-block` to have some content tags:
```html
  <span class="block">
    <h3><content select=".title"></content></h3>
    <content select="[content]"></content>
  </span>
```

Note the `select` attribute of the `content` tags.  The value of the `select` attribute is any valid CSS selector.  It will be used to pull customized content from each element 'instance' into our template.

For example, we could update `mj-demo-app` to look like this:
```html
  <template>
    <div class="main">
      <mj-block>
        <span class="title">Title 1</span>
        <span content>Content 1</span>
      </mj-block>
      <mj-block>
        <span class="title">Second title</span>
        <span content>The second content.</span>
      </mj-block>
      <mj-block>
        <span class="title">Title three</span>
        <span content>Content cohesive to title three.</span>
      </mj-block>
    </div>
  </template>
```

Now we have three elements that look the same but have unique content.

## customize the style

But what if we want to customize the styles of our element?

This can be accomplished with custom CSS properties.

Update `mj-block` `.block h3` `background-color` style to contain a CSS variable with a default value:
```html
    background-color: var(--my-block-title-hilite, #dcdfd7);
```

Add some styles in `mj-demo-app` to set the variable for the different `mj-block` instances:
```html
    .important {
      --mj-block-title-hilite: #dfa0ff;
    }
    .boring {
      --mj-block-title-hilite: #ffffbb;
    }
```

Add finally, set the classes on the `mj-block` instances:
```html
  <mj-block class="important">
    <span class="title">Second title</span>
    <span content>The second content.</span>
  </mj-block>
  <mj-block class="boring">
    <span class="title">Title three</span>
    <span content>Content cohesive to title three.</span>
  </mj-block>
```

Now we have three elements with customized colors.  Notice that the first element uses the default color.

Let's enhance our element a bit with user interaction and data binding.
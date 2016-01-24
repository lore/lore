# app/index.html

### Purpose

This is the HTML file that gets served to the browser.  It contains text that says "Loading..." that will disappear as
soon as `bundle.js` has been downloaded and `lore.summon()` has finished setting up your application.

It also contains a DOM element to hang dialogs from so they don't conflict with any CSS or JavaScript behaviors in
the application (styling overrides or event bubbling cancellation).

```html
<html>
  <head>
    <title>New Lore App</title>
    <style>
      html {
        background: #fefefe;
      }
      .loading-text {
        text-align: center;
        line-height: 100vh;
        font-size: 32px;
        margin: 0;
        font-weight: bold;
        font-family: Roboto, sans-serif;
        background: #fefefe;
        color: #000;
      }
    </style>
  </head>
  <body>
    <div id="root">
      <h1 class="loading-text">
        Loading...
      </h1>
    </div>
    <div id="dialog"></div>

    <script src="dist/bundle.js"></script>
  </body>
</html>
```

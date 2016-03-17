# Loading Screens

At the root of your project you should see an `index.html` file.  This file is what gets served to the browser, and
should currently look like this:

```html
<html>
  <head>
    <title>New Lore App</title>
    <style>
      .loading-text {
        text-align: center;
        line-height: 100vh;
        font-size: 32px;
        margin: 0;
        font-weight: bold;
        color: rgba(0,0,0,.54);
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

    <script src="/dist/bundle.js"></script>
  </body>
</html>
```

### Loading Screen

The `#root` element is where your application is going to be attached. The default `<style>` tag and `.loading-text` 
element are there to serve as a minimalistic splash screen while the browser fetches the JavaScript files. It's intended
to be a more meaningful alternative to the standard blank white page.  The loading screen will look like this:

![Loading Screen](../../images/step0-visual-loading-screen.png)


### TODO  

Update this to show how to add a more interesting loading screen.

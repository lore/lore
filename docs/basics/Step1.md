# Step1: Add Styling

Since this tutorial is focused on demonstrating how Lore can speed up the *functional* development of React/Redux
applications, we're going to drop in [Bootstrap](http://getbootstrap.com) so we can avoid worrying about styling.

If you're using the CLI to follow along, you can complete this step by running the following command:

```sh
lore generate:tutorial step1
```

### Install Bootstrap

To install Bootstrap, you'll need to add the necessary CSS and JavaScript files to `index.html`. Add the following 
stylesheet at the bottom of the `<head>` element.

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
```

Now add the following scripts at the bottom of the `<body>` tag, immediately above the `bundle.js` script.

```html
<script src="https://code.jquery.com/jquery-2.2.1.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
```

### Visual Check-in

If everything went well, your application should now look like this.

![New Lore App](../../images/step1-visual.png)

## Code Changes

Below is a list of files modified during this step, as well as a visual diff to show you what was added or removed 
between this step and the last one.

### index.html

{% tabs tab1="Diff", tab2="Source" %}
{% tab1 %}
![New Lore App](../../images/step1-diff.png)
{% tab2 %}
```html
<html>
  <head>
    <title>Guessatron 5000</title>
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
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  </head>
  <body>
    <div id="root">
      <h1 class="loading-text">
        Loading...
      </h1>
    </div>
    <div id="dialog"></div>

    <script src="https://code.jquery.com/jquery-2.2.1.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script src="/dist/bundle.js"></script>
  </body>
</html>
```
{% endtabs %}

## Next Steps

Next we're going to [add a Header](./Step2.md) to our application, and learn about one of Lore's generators.

# todomvc

This is a modified version of the [React TodoMVC example](http://todomvc.com/examples/react).

![lore_example__react_ _todomvc](https://cloud.githubusercontent.com/assets/2637399/12047374/9f4c1c62-ae87-11e5-992f-cbf6a5b01f14.png)

## Modifications
It has been modified in the following ways:

1. It uses [React Router](https://github.com/rackt/react-router)
2. Data is served from a real API (not localStorage) using json-server](https://github.com/typicode/json-server).

## Usage

This example uses [json-server](https://github.com/typicode/json-server) to provide an API for the example. All data
is stored persistently in the `db.json` file at the root of the project.

To start the API server, run this command:

```
npm run server
```

Next, run webpack to build and serve the project:

```
npm start
```

Finally, open your browser and navigate to `http://localhost:3000` to view the example.

## Misc Notes
Unsure why at the moment, but in `src/components/Master.js` if the line:

```js
render: function() {
  return (
    <div>
      {React.cloneElement(this.props.children)}
    </div>
  );
}
```

is changed to:

```js
render: function() {
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```

The `src/components/Home.js` component is not re-rendered once the AJAX call to retrieve the list of todos returns.
`Master` is re-rendered, but the component in the child route (`Home`) is not.

# todomvc

This is a modified version of the [React TodoMVC example](http://todomvc.com/examples/react).

![lore_example__react_ _todomvc](https://cloud.githubusercontent.com/assets/2637399/12047374/9f4c1c62-ae87-11e5-992f-cbf6a5b01f14.png)

## Modifications
It has been modified in the following ways:

1. It uses [React Router](https://github.com/rackt/react-router)
2. Calls against the server are intercepted using [faux-server](https://github.com/lore/faux-server) which intercepts any AJAX calls and mocks out the responses, storing the mocked data in localStorage.

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

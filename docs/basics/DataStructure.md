# What's up with your data structure?

In-progress documentation to explain Lore's data structure.
 
```js
var model = {
  id: 1 || 'ded38e0e-75b7-4503-b78d-83a8282ad137'
  cid: 'c1',
  state: 'UPDATING'
  data: {
    id: 1 || 'ded38e0e-75b7-4503-b78d-83a8282ad137',
    title: 'Explain data structure',
    isCompleted: false
  },
  errors: []
}


var collection = {
  state: 'FETCHING'
  data: [],
  errors: []
}

```

Quick notes about model's data structure:

* **id**:unique id assigned by the server (number, string, uuid, etc)
* **cid**: unique (per app) client-side id assigned by Lore
* **state**: representation of activity being done to the data (creating it, updating it, error updating it, etc.)
* **data**: the actual JSON attributes returned by the server
* **errors**: in the case of an errors from the server (400 something) will contain the error message(s) from the server.

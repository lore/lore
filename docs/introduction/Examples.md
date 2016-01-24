# Examples

Lore is distributed with a few examples in its [source code](https://github.com/storcery/lore/tree/master/examples).

## TodoMVC

Run the [TodoMVC](https://github.com/storcery/lore/tree/master/examples/todomvc) example:

```
git clone https://github.com/storcery/lore.git

cd lore/examples/todomvc
npm install
npm start

open http://localhost:3000/
```

It covers:

* Creating a model
* Connecting a component to the data store
* CRUD Actions

## Dialogs-Querying

Run the [Counter](https://github.com/storcery/lore/tree/master/examples/dialogs-querying) example:

```
git clone https://github.com/storcery/lore.git

cd lore/examples/dialogs-querying
npm install
npm start

cd sails-api-server
npm install
npm start

open http://localhost:3000/
```

It covers:

* Launching dialogs
* Querying the server for a subset of data (todos that belong to a specific list)

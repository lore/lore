# API Server for the Lore Tutorial

This server is a [Sails](http://sailsjs.org) application.

To setup the server run:

```sh
npm install
npm start
```

The server will boot up on `http://localhost:1337`.

The `colors` endpoint the tutorial will use is located at `http://localhost:1337/colors`.

This server uses a [SQLite](https://www.sqlite.org) database to store the colors. The database will be created
automatically the first time the server starts up, and will be located at `.tmp/localDiskDb.db`.  This server is
configured to destroy the database everytime the server restarts, so if any colors you created disappear that's why.

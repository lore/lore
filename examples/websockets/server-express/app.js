var express = require('express');
var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var bootstrap = require('./bootstrap');
var PORT = 1337;

// create the app
var app = express();

// configure socket.io
var server = http.createServer(app);
var io = require('socket.io')(server);
var io_todos = io.of('/todos');


/**
 * Configure the application
 */

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// routes
var todos = require('./routes/todos');

app.get('/', function (req, res) {
  res.json({
    todos: 'http://localhost:' + PORT + '/todos'
  });
});

// setup the CRUD routes for /todos, and add middleware
// that will expose to namespaced socket.io connection
// so we can emit events for CRUD operations
app.use('/todos', function(req, res, next) {
  req.io = io_todos;
  next();
}, todos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Integrate socket.io into the http server
 */

// io.on('connection', function(socket){
//   console.log('websockets: a user connected to /');
//
//   socket.on('disconnect', function(socket){
//     console.log('websockets: a user disconnected from /');
//   });
// });

io_todos.on('connection', function(socket){
  console.log('websockets: a user connected to /todos');

  socket.on('disconnect', function(socket){
    console.log('websockets: a user disconnected from /todos');
  });
});

/**
 * Bootstrap the database, then listen on
 * provided port, on all network interfaces.
 */

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}

bootstrap(function() {
  server.listen(PORT, 'localhost');
  server.on('error', onError);
  server.on('listening', onListening);
});

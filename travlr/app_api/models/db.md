This file contains notes from the Loc8r app from the Getting MEAN book. These are good notes, but don't exactly apply to the travlr project. db.js in models has the actual code for travlr. 
```js
// this file is about setting up the mongodb connection logic
// we import this file in app.js, therefore executing all its content

// importing mongoose
const mongoose = require('mongoose');

// local database uri
const dbURI = 'mongodb://localhost/Loc8r';
mongoose.connect(
  dbURI,
  //{ useNewUrlParser: true } // idk what this is. book says it disables deprecated warnings, but node.js says useNewUrlParse itself is deprecated 
);

// Handling multiple database connection. Also does not work anymore because .on() and .close() no longer take in a 
/*
const dbURIlog = 'mongodb://localhost/Loc8rLog';
const logDB = mongoose.createConnection(dbURIlog);

logDB.on('connected', () => {
  console.log(`Mongoose connected to ${dbURIlog}`);
});
logDB.close(() => {
  console.log('Mongoose log disconnected');
});
*/

// logging database connection/error/disconnect
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// TODO: close mongodb connection upon app termination
// BUG: mongoose.connection.close() no longer takes in a function as argument
// BUG: mongodb connection still shows in taskmanager after terminating node.js application
// closing the mongodb database connection
// const gracefulShutdown = (msg, callback) => {
//   mongoose.connection.close(() => {
//     console.log(`Mongoose disconnected through ${msg}`);
//     callback();
//   });
// };

// these event listeners listen for when the ctrl+c signal is send to Windows (OS) or when nodemon restarts, and call the
// callback function responsible for closing the mongodb connection

// nodemon uses SIGUSR2 signal
// process.once('SIGUSR2', () => {
//   gracefulShutdown('nodemon restart', () => {
//     process.kill(process.pid, 'SIGUSR2');
//   });
// });

// process.on('SIGINT', () => {
//   gracefulShutdown('app termination', () => {
//     process.exit(0);
//   });
// });
// process.on('SIGTERM', () => {
//   gracefulShutdown('Heroku app shutdown', () => {
//     process.exit(0);
//   });
// });  



// adding the schema to the application
require('./locations_schema');
```


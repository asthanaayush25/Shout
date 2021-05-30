const express = require('express');
const app = express();
const http = require('http');
const ngrok=require('ngrok');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
const port=3000;
server.listen(port,function() {
  console.log(`Server running at ${port}`);
  (async function() {
  const url = await ngrok.connect(port);
  console.log(`Node.js local server is publicly-accessible at ${url}`);
  })();


});

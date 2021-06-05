const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const http = require('http');
const ngrok=require('ngrok');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.set("view engine","ejs");
app.use(express.static('Public'));
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', (req, res) => {
  res.render('landing',{});
});
app.post('/three',(req,res)=>{
  var user=req.body.user;
  res.render('index',{
    user : user
  });
});

app.post('/one',(req,res)=>{
var url=req.body.url;

res.redirect(url.toString());
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
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

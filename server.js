const app = require('express')(); 
const servidor  = require('http').createServer(app); 
const io = require('socket.io')(servidor);

const porta = process.env.PORT || 8080;

app.use(require("express").static("public"))

app.get('/', function(req, res) { 
  res.sendFile(__dirname + '/public/index.html'); 
});

io.on("connection", socket => {

    socket.on("conectado", data => {
      io.emit("conectado", data)
    })

    socket.on('disconnect', () =>  {
        console.log('usuario saiu');
      })

    socket.on("chat message", data => {
      console.log(`mensagem recebida ${data}`)

      io.emit("chat message", data)
    })
})

servidor.listen(porta, function() { 
  console.log(`Ouvindo na porta ${porta}`); 
});
const express = require("express");
const app = express();
const path = require('path');
const { Socket } = require("socket.io");
PORT =  4000;

app.use(express.static(path.join(__dirname, 'public')));
app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');

const server = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

const io = require('socket.io')(server)

let socketconnected = new Set();

io.on('connection', onconnected)

function onconnected(socket) {
    console.log(socket.id)
    socketconnected.add(socket.id);

    io.emit('clients-total', socketconnected.size);

    socket.on('disconnect', () => {
        console.log('socket disconnected', socket.id);
        socketconnected.delete(socket.id)
        io.emit('clients-total', socketconnected.size);

    })
    socket.on("message",(data)=>{
        // console.log(data)
        socket.broadcast.emit('chat-message',data);
    })
    
    socket.on('feedback',(data)=>{
        socket.broadcast.emit('feedback',data);
    })
}
app.use((err,req,res,text)=>{
    console.log(err.stack);
    res.type('text/plain')
    res.status(500);
    res.send('internal server err 500');
})
app.get('/', (req, res) => {
    res.render('index')
})


module.exports=app;
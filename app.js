const express = require("express");
const app = express();
const path = require('path');
const { Socket } = require("socket.io");
PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');



<<<<<<< HEAD

const server = app.listen(PORT, () => {
    console.log(`server running on port`)
=======
app.get('/', (req, res) => {
    res.render('index')
})
const server = app.listen(PORT, () => {
    console.log(`🏐 server running on port http://localhost:${PORT}/`)
>>>>>>> 43250b0fc0732deb36ded65b45b2d979b160ee46
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

<<<<<<< HEAD
=======

// const server = app.listen(PORT, () => {
//     console.log(`🏐 server running on port http://localhost:${PORT}/`)
// })
>>>>>>> 43250b0fc0732deb36ded65b45b2d979b160ee46


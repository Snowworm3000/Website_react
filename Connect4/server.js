const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));



const io = socketIO(server);

const users = {}

let roomno = 1
let playerNo = 0
let allClients = []
let rooms = {}
io.on('connection', socket => {
    allClients.push(socket.id)

    socket.playerNo = playerNo
    socket.join("room"+roomno)
    rooms[socket.id] = roomno
    console.log(rooms,"hi")
    let currentRoom = Object.values(socket.rooms)[1]
    clients = io.sockets.adapter.rooms["room"+roomno.toString()].sockets
    console.log(clients)
    let clientsLength = Object.values(clients).length
    console.log("clients",clientsLength)
    console.log("room",roomno)

    io.in("room"+roomno).emit("roomSet",roomno)

    io.in("room" + roomno).emit("name", socket.id)

    socket.emit("playerNo",socket.playerNo)

    socket.on("move",move=>{
        let currentRoom = Object.values(socket.rooms)[1]
        console.log(currentRoom, socket.room)
        socket.room = currentRoom
        io.in(currentRoom).emit("move",{"col":move,"player":socket.playerNo})
    })

    console.log("done")
    playerNo++;
    playerNo = playerNo % 2;

    console.log("room", socket.room, Object.values(socket.rooms)[1])

    socket.on("move",val =>{
        console.log(Object.values(socket.rooms)[1])
        console.log("BIOWJBO")
    })


    if(clientsLength >= 2){
        roomno++;
        console.log("new room") 
    }

    socket.on("disconnect", ()=>{
        var i = allClients.indexOf(socket);
        allClients.splice(i, 1);

        let currentRoom = "room"+rooms[socket.id];

        delete rooms[socket.id]

        console.log("user disconnected")
        io.in(currentRoom).emit("userLeft","i");
        socket.leave(currentRoom)
    })
})
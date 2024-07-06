const express = require("express");
const app = express();


const path = require("path");
const http = require("http");
const { Server } = require("socket.io");


const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("")));

let arr = []
let playingArray = []

io.on("connection", (socket) => {

  // To Handle Login
  socket.on("Search", (e) => {
    console.log(e)
    if (e.name != null) {

      arr.push(e.name)

      if (arr.length >= 2) {
        let p1obj = {
          p1name: arr[0],
          p1value: "X",
          p1move: ""
        }
        let p2obj = {
          p2name: arr[1],
          p2value: "O",
          p2move: ""
        }
        let obj = {
          p1: p1obj,
          p2: p2obj,
          sum: 1
        }
        playingArray.push(obj)
        arr.splice(0, 2)
        console.log(arr);
        io.emit("Search", { allPlayers: playingArray })
      }
    }
  })

  //To Update X-Y Turn for user
   socket.on("playing", (e) => {
    console.log(e)
    if(e.turn=="X"){
             let objToChange=playingArray.find(obj=>obj.p1.p1name==e.name)
             objToChange.p1.p1move=e.id
             objToChange.p1.p1turn=e.turn
             objToChange.sum++
    }
    else if(e.turn=="O"){
     let objToChange=playingArray.find(obj=>obj.p2.p2name==e.name)
             objToChange.p2.p2move=e.id
             objToChange.p2.p2turn=e.turn
             objToChange.sum++
    }

    io.emit("playing",{allPlayers:playingArray})
})


})




app.get("/", (req, res) => {
  return res.sendFile("index.html");
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});





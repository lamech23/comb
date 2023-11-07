const { Server } = require("socket.io");

function socketConfiguration(server, clientURL) {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`socket connection established, ${socket.id}`);

    socket.on("disconnect", function () {
      console.log("user disconnected");
    });

    // when a new user connects, send a message to all users
    socket.broadcast.emit("user connected");
  });



const connectedUsers ={}
  io.on("connection", function(socket) {
    console.log("websocket connection initiated by a user", socket.id);

    socket.on("allUsers", ()=>{

      // Emit the message back to the sender
      io.emit('allUsers', Object.values(connectedUsers));

      console.log(connectedUsers);
    })
  });


  return io;
}
module.exports = socketConfiguration;

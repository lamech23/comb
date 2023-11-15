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

    const allUsers = []
  io.on("connection",(socket)=>{
    console.log("updating part ", socket.id);
    socket.on("updating", (userId, state)=>{
      const existingUser = allUsers.find((user) => user.userId === userId);

      if (!existingUser) {
        allUsers.push({
          userId,
          state: "inActive", // Set initial status to "active"
          socketId: socket.id,
        });
      } else {
        existingUser.socketId = socket.id; // Update the socketId if the user already exists
      }
        io.emit("updatingUser", allUsers);
    console.log(allUsers, "this is the id ");

      
      // socket.on("activate", (user) => {
      //   const foundUser = allUsers.find((u) => u.user === user);
      //   if (foundUser) {
      //     foundUser.status = user.status // Change the status to "inactive"
      //     console.log(foundUser, "found one");
      //     // io.emit("updatingUser", allUsers);
      //   }
      // });



      // socket.on("disconnect", () => {
      //   const disconnectedUser = allUsers.find((u) => u.socketId === socket.id);
      //   if (disconnectedUser) {
      //     allUsers.splice(allUsers.indexOf(disconnectedUser), 1);
      //     // io.emit("updatingUser", allUsers);
      //   }
      // });
  
    })

    })






  return io;
}
module.exports = socketConfiguration;

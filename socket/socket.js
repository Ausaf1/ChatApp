const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (userId, socketId, userInfo) => {
  const checkUser = users.some((user) => user.userId === userId);
  if (!checkUser) {
    users.push({
      userId,
      socketId,
      userInfo,
    });
  }
};

const userRemove = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const findFriend = (id) => {
  return users.find((user) => user.userId === id);
};

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("addUser", (userId, userInfo) => {
    addUser(userId, socket.id, userInfo);
    io.emit("getUser", users);
  });
  socket.on("sendMessage", (data) => {
    const user = findFriend(data.recieverId);
    if (user != undefined) {
      socket.to(user.socketId).emit("getMessage", {
        senderId: data.senderId,
        senderName: data.senderName,
        recieverId: data.recieverId,
        createAt: data.time,
        message: {
          text: data.message.text,
          image: data.message.image,
        },
      });
    }
  });
  socket.on("typingMessage", (data) => {
    const user = findFriend(data.recieverId);
    if (user != undefined) {
      socket.to(user.socketId).emit("typingMessageGet", {
        senderId: data.senderId,
        recieverId: data.recieverId,
        msg: data.msg,
      });
    }
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
    userRemove(socket.id);
    io.emit("getUser", users);
  });
});

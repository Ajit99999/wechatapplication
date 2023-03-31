const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(cors());

// Deployment Code
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../wechatfrontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(
      path.resolve(__dirname, "../wechatfrontend", "dist", "index.html")
    );
  });
} else {
  app.get("/", (_, res) => {
    res.send("API is running..");
  });
}
// Deployment code
const PORT = process.env.PORT || 8800;
const server = app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
let activeUsers = [];

io.on("connection", (socket) => {
  socket.on("add-new-users", (newUserId) => {
    if (!activeUsers.find((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }

    io.emit("get-users", activeUsers);
  });

  socket.on("add-new-messages", (data) => {
    const { otherUserId, ...restData } = data;
    const otherUser = activeUsers.find(
      (user) => user.userId === data.otherUserId
    );

    if (otherUser) {
      io.emit("get-new-messages", restData);
    }
  });

  socket.on("remove_user", (id) => {
    activeUsers = activeUsers.filter((user) => user.userId !== id);
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", activeUsers);
  });
});
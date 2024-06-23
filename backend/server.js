const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const errorHandler = require("./middlewares/errorHandler");
const cookie = require("cookie-parser");
const { Server } = require("socket.io");

const app = express();
app.use(express.json({ limit: "50mb", extended: true }));
app.use(cookie());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes")(io);
const messageRoutes = require("./routes/messageRoutes")(io);

const base = "/api/v1";
app.use(`${base}/auth`, authRoutes);
app.use(`${base}/chat`, chatRoutes);
app.use(`${base}/message`, messageRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3001;
const connectDb = require("./db");

const startServer = async () => {
  try {
    await connectDb.query("SELECT 1");
    console.log("DB Connected");

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    io.on("connection", (socket) => {
      console.log("New WebSocket connection");

      socket.on("joinChat", (chatId) => {
        socket.join(chatId);
      });

      socket.on("sendMessage", (message) => {
        io.to(message.chatId).emit("receiveMessage", message);
      });

      socket.on("disconnect", () => {
        console.log("WebSocket disconnected");
      });
    });
  } catch (err) {
    console.log(`DB connection failed. \n${err}`);
  }
};

startServer();

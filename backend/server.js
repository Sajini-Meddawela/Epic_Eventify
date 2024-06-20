const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const errorHandler = require("./middlewares/errorHandler");
const cookie = require("cookie-parser");
const { Server } = require("socket.io"); // Correct import

const app = express();
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "50mb", extended: true }));
app.use(cookie());
app.use(cors());

// Create HTTP server and integrate with Socket.io
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Change to your frontend URL
    methods: ["GET", "POST"],
  },
});

// Import routes
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes")(io); // Pass the io instance
const messageRoutes = require("./routes/messageRoutes")(io); // Pass the io instance

// Base URL
const base = "/api/v1";
app.use(`${base}/auth`, authRoutes);
app.use(`${base}/chat`, chatRoutes);
app.use(`${base}/message`, messageRoutes);

// Error handling middleware
app.use(errorHandler);

// Port
const port = process.env.PORT || 3001;

// Connect to DB
const connectDb = require("./db");

const startServer = async () => {
  try {
    await connectDb.query("SELECT 1");
    console.log("DB Connected");

    // Start server
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    // Handle WebSocket connections
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

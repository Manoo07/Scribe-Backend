import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import http from "http";
import WebSocket, { Server as WebSocketServer } from "ws";
import apiRoutes from "./routes/api";
import bodyParser from "body-parser";
import { routes } from "./routes";

// Initialize Express app
const app = express();
const server = http.createServer(app);

// add cors
app.use(cors({ origin: "*" }));

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

//Define routes
routes.forEach((r) => {
  app.use(r.basePath, ...(r.middleware || []), r.router);
});
// Initialize WebSocket server
const wss = new WebSocketServer({ server });

// Middleware and routes
app.use(express.json());
app.use("/api/v1", apiRoutes);

// WebSocket connection
wss.on("connection", (ws: WebSocket) => {
  console.log("New client connected");

  ws.on("message", (message: WebSocket.Data) => {
    const data = JSON.parse(message.toString());

    if (data.type === "message") {
      const { content, classroomId, userId } = data;

      // Broadcast message to all connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: "message",
              content,
              classroomId,
              userId,
              timestamp: new Date(),
            })
          );
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

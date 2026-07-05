#!/usr/bin/env node
/**
 * Temporary WebSocket echo server for DebugSwift screenshot capture.
 * Endpoint: ws://127.0.0.1:3001/websocket
 *
 * Usage:
 *   node scripts/websocket-test-server.mjs
 *   npm run websocket-server
 */

import { createServer } from "node:http";
import { WebSocketServer } from "ws";

const PORT = Number(process.env.PORT) || 3001;
const PATH = "/websocket";

/** @type {Map<string, { ws: import('ws').WebSocket, connectedAt: Date, messagesReceived: number, messagesSent: number }>} */
const connections = new Map();
let connectionCount = 0;

function handleCommand(message, connectionId) {
  const cmd = message.toLowerCase().trim();

  switch (cmd) {
    case "ping":
      return { type: "pong", timestamp: new Date().toISOString(), connectionId };
    case "time":
      return { type: "time", timestamp: new Date().toISOString(), unix: Math.floor(Date.now() / 1000) };
    case "json":
      return {
        type: "test_json",
        timestamp: new Date().toISOString(),
        data: { string: "Hello from server!", number: 42, nested: { ok: true } },
      };
    case "binary":
      return Buffer.from("Binary test payload from DebugSwift screenshot server");
    case "burst":
      return Array.from({ length: 5 }, (_, i) => ({
        type: "burst_message",
        sequence: i + 1,
        data: `Burst message ${i + 1} of 5`,
      }));
    case "stats": {
      const conn = connections.get(connectionId);
      return {
        type: "connection_stats",
        connectionId,
        stats: {
          connectedAt: conn?.connectedAt.toISOString(),
          messagesReceived: conn?.messagesReceived ?? 0,
          messagesSent: conn?.messagesSent ?? 0,
        },
        serverStats: { activeConnections: connections.size, serverUptime: Math.floor(process.uptime()) },
      };
    }
    default:
      return null;
  }
}

const httpServer = createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(`DebugSwift WebSocket test server — connect to ws://127.0.0.1:${PORT}${PATH}\n`);
});

const wss = new WebSocketServer({ server: httpServer, path: PATH });

wss.on("connection", (ws) => {
  connectionCount += 1;
  const connectionId = `conn_${connectionCount}`;
  const conn = { ws, connectedAt: new Date(), messagesReceived: 0, messagesSent: 0 };
  connections.set(connectionId, conn);

  const welcome = {
    type: "welcome",
    connectionId,
    timestamp: new Date().toISOString(),
    message: "Welcome to DebugSwift WebSocket Test Server",
  };
  ws.send(JSON.stringify(welcome));
  conn.messagesSent += 1;

  ws.on("message", (data, isBinary) => {
    conn.messagesReceived += 1;
    const text = isBinary ? data.toString() : String(data);

    if (!isBinary) {
      const response = handleCommand(text, connectionId);
      if (response) {
        const messages = Array.isArray(response) ? response : [response];
        messages.forEach((msg, index) => {
          setTimeout(() => {
            if (ws.readyState === ws.OPEN) {
              ws.send(Buffer.isBuffer(msg) ? msg : JSON.stringify(msg));
              conn.messagesSent += 1;
            }
          }, index * 100);
        });
        return;
      }
    }

    if (ws.readyState === ws.OPEN) {
      if (isBinary) {
        ws.send(data);
      } else {
        ws.send(
          JSON.stringify({
            type: "echo",
            original: text,
            timestamp: new Date().toISOString(),
            connectionId,
          }),
        );
      }
      conn.messagesSent += 1;
    }
  });

  ws.on("close", () => {
    connections.delete(connectionId);
  });
});

function shutdown() {
  wss.close(() => {
    httpServer.close(() => process.exit(0));
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

httpServer.listen(PORT, () => {
  process.stdout.write(`websocket-test-server listening on ws://localhost:${PORT}${PATH}\n`);
});

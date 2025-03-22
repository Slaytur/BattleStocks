import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
  console.log('new client connected');

  ws.on('close', () => {
    console.log("connection lost");
  });
});


import WebSocket from 'ws';

const serverID = (Math.random() + 1).toString(36).substring(5);  
console.log(serverID);

const wss = new WebSocket.Server({ port: '8080' });

wss.on('connection', (ws: WebSocket) => {
  console.log('new client connected');

  ws.on('close', () => {
    console.log("connection lost");
  });
});


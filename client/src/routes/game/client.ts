import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  console.log("connected");
});

ws.on('close', () => {
  console.log("connected");
});

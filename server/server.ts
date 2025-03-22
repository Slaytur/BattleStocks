import * as WebSocket from "ws";

// const serverID = (Math.random() + 1).toString(36).substring(5);
// console.log(serverID);

const wss = new WebSocket.WebSocketServer({ port: "8080" });

const servers = {};

wss.on("connection", (ws: WebSocket) => {
    console.log("new client connected");

    // { serverId: 90jrse90rjieor }
    ws.on("create", () => {
        const serverId = crypto.randomBytes(32);

        if (servers[msg.serverId]) return; // todo: err handling
        servers[msg.serverId] = [ws];

        ws.send("serverId", serverId);
    });

    // msg: { serverId: 90 }
    ws.on("join", msg => {
        ws.data = {};
        ws.data.serverId = msg.serverId;

        if (!servers[msg.serverId]) return;
        servers[msg.serverId].push(ws);
    });

    ws.on("close", () => {
        if (ws.data?.serverId) servers[ws.data.serverId].splice(servers[ws.data.serverId].indexOf(ws), 1);
        console.log("connection lost");
    });
});

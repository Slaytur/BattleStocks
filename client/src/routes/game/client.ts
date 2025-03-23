import { hc } from "hono/client";

const ws = new WebSocket("ws://127.0.0.1:8080/game");

ws.onopen = () => {
    console.log("connected");
};

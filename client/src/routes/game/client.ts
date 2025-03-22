import { hc } from "hono/client";

const client = hc("http://127.0.0.1:8080/game");

const ws = client.ws.$ws(0);

ws.onopen = () => {
    console.log("connected");
};

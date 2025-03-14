import { TurboStream } from 'node-turbo';
import { SseTurboStream } from "node-turbo/sse";
import Fastify from "fastify";
import FastifyWebSocket from "@fastify/websocket";
import FastifyFormbody from "@fastify/formbody";
import { createWebSocketStream } from 'ws';
import fastifyStatic from '@fastify/static';
import path from 'path';
const TurboHeader = { "content-type": "text/vnd.turbo-stream.html; charset=utf-8" };
const fastify = Fastify({
    logger: true
});
await fastify.register(fastifyStatic, {
    root: path.join("/home/wojciech/Work/hotwire-nodejs/dist"),
});
await fastify.register(FastifyWebSocket);
await fastify.register(FastifyFormbody);
fastify.get("/", (_, reply) => {
    reply.sendFile("index.html");
});
fastify.get("/initial_messages", (_, res) => {
    const ts = new TurboStream();
    ts.append('initial_messages', '<p>Initial Messages</p>');
    res.headers(TurboHeader).send(ts.render());
});
fastify.post("/messages", (req, res) => {
    const body = req.body;
    const ts = new TurboStream();
    ts.append("messages", `<div class="bg-red-500">Task: ${body.task}</div>`);
    res
        .headers(TurboHeader)
        .send(ts.render());
});
fastify.get("/ws", { websocket: true }, (socket) => {
    const ts = new TurboStream();
    const readable = ts.createReadableStream();
    ts
        .append('target-id', '<p>My content</p>')
        .update('target-id-2', '<p>Updated content</p>')
        .remove('target-id-2');
    const stream = createWebSocketStream(socket, { /* options */});
    stream.setEncoding('utf8');
    readable.pipe(stream);
    ts
        .append('target-id', '<p>My content 2</p>');
});
fastify.get("/sse", (_, res) => {
    res.headers({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    // Turbo listens to nameless events and 'message' events.
    const ssets = new SseTurboStream('message');
    // Timeout is only here for us to have time to observe.
    setTimeout(() => {
        ssets
            .append('stream1', '<p>My content</p>')
            .append('stream2', '<p>My content 2</p>')
            .append('stream3', '<p>\n<span>My multiline content 3</span>\n</p>');
        res.send(ssets.flush());
    }, 1000);
    // You can also use the streams API.
    setTimeout(() => {
        ssets.prependAll('.stream', '<p>Prepend!</p>');
        res.send(ssets);
    }, 2000);
});
// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
    if (err)
        throw err;
    console.log(`Server is now listening on ${address}`);
    // Server is now listening on ${address}
});

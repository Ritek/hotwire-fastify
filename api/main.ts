import { TurboStream } from 'node-turbo';
import { SseTurboStream } from "node-turbo/sse";

import Fastify from "fastify";
import FastifyWebSocket from "@fastify/websocket";
import FastifyFormbody from "@fastify/formbody";
import { createWebSocketStream } from 'ws';
import fastifyStatic from '@fastify/static';
import path, { dirname } from 'path';
import { HttpHeader } from 'fastify/types/utils';
import { randomInt } from 'crypto';
import { fileURLToPath } from 'url';


type Headers = Partial<Record<HttpHeader, string>>;
const TurboHeader: Headers = {"content-type": "text/vnd.turbo-stream.html; charset=utf-8"}

const fastify = Fastify({
  logger: true
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const absolutePath = path.join(__dirname, "../dist");

await fastify.register(fastifyStatic, {
  root: absolutePath
});
await fastify.register(FastifyWebSocket);
await fastify.register(FastifyFormbody);


fastify.get("/", (_, reply) => {
  reply.sendFile("index.html");
});

fastify.get("/initial_messages", (_, res) => {
  const ts = new TurboStream();
  ts.append('messages', '<p>System Message: Welcome</p>');

  res.headers(TurboHeader).send(ts.render()); 
});

fastify.post("/messages", (req, res) => {
  const body = req.body as Record<string, string>;
  const ts = new TurboStream();
  const random = randomInt(100);

  ts.append("messages", `<div id="${random}" class="chat-message flex justify-between border-b-2 border-gray-400 mb-2">
    User "${body.user || "anonim"}", sent: ${body.message} 
    <button class="hover:text-red-500" type="submit" name="removeMessage" value="${random}" 
      formmethod="post" formaction="/delete-message" formtarget="blank" formnovalidate="formnovalidate"
      onClick="this.parentElement.classList.add('fade-out')"
      >&#10799;</button>
  </div>`);
  
  res
    .headers(TurboHeader)
    .send(ts.render());
});

fastify.post("/delete-message", (req, res) => {
  const body = req.body as Record<string, string>;
  const ts = new TurboStream();

  ts.remove(`${body.removeMessage}`);
  
  res
    .headers(TurboHeader)
    .send(ts.render());
});


fastify.get("/ws", { websocket: true }, (socket) => {
  const ts = new TurboStream();
  const readable = ts.createReadableStream();

  ts.append('messages', '<p>My content</p>');

  const stream = createWebSocketStream(socket, { /* options */ })
  stream.setEncoding('utf8')
  readable.pipe(stream);

  ts.append('target-id', '<p>My content 2</p>');
  socket.send(ts.render()); 
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
  if (err) throw err
  console.log(`Server is now listening on ${address}`);
  // Server is now listening on ${address}
});

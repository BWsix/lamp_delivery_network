import blitz from "blitz/custom-server";
import { createServer } from "http";
import five from "johnny-five";
import { nanoid } from "nanoid";
import { log } from "next/dist/server/lib/logging";
import { parse } from "url";

const { NEXT_PUBLIC_PORT: PORT = "3000", NODE_ENV } = process.env;
const app = blitz({ dev: NODE_ENV !== "production" });
const handle = app.getRequestHandler();
const board = new five.Board({ repl: false });
const PEER_SERVER_ID = nanoid();

board.on("ready", () => {
  const relay = new five.Relay(8);
  relay.open();

  let relayStatus = "on";

  app.prepare().then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url!, true);

      switch (parsedUrl.pathname) {
        case "/on": {
          relay.open();
          return res.writeHead(200).end((relayStatus = "on"));
        }
        case "/off": {
          relay.close();
          return res.writeHead(200).end((relayStatus = "off"));
        }
        case "/current": {
          return res.writeHead(200).end(relayStatus);
        }
        case "/id": {
          return res.writeHead(200).end(PEER_SERVER_ID);
        }
        default: {
          handle(req, res, parsedUrl);
        }
      }
    }).listen(PORT, () => {
      log.success(`Custom server ready on http://localhost:${PORT}`);
    });
  });
});

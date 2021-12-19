import blitz from "blitz/custom-server";
import { createServer } from "http";
import five from "johnny-five";
import { log } from "next/dist/server/lib/logging";
import { parse } from "url";

const { PORT = "3000", NODE_ENV } = process.env;
const app = blitz({ dev: NODE_ENV !== "production" });
const handle = app.getRequestHandler();
const board = new five.Board({ repl: false });

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
        default: {
          handle(req, res, parsedUrl);
        }
      }
    }).listen(PORT, () => {
      log.success(`Custom server ready on http://localhost:${PORT}`);
    });
  });
});

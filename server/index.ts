import { BASE_URL } from "app/constants";
import blitz from "blitz/custom-server";
import { createServer } from "http";
import { nanoid } from "nanoid";
import { log } from "next/dist/server/lib/logging";
import { parse } from "url";

const { NEXT_PUBLIC_PORT: PORT = "3000", NODE_ENV } = process.env;
const app = blitz({ dev: NODE_ENV !== "production" });
const handle = app.getRequestHandler();
const PEER_SERVER_ID = nanoid();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);

    switch (parsedUrl.pathname) {
      case "/id": {
        return res.writeHead(200).end(PEER_SERVER_ID);
      }
      default: {
        handle(req, res, parsedUrl);
      }
    }
  }).listen(PORT, () => {
    log.success(`Custom server ready on http://localhost:${PORT}`);
    log.success(`You can enable camera on ${BASE_URL}/webcam`);
  });
});

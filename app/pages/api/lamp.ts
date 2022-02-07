import { BlitzApiRequest, BlitzApiResponse } from "blitz";
import five from "johnny-five";
import { createNanoEvents } from "nanoevents";

interface EventProps {
  on: () => void;
  off: () => void;
}

let status: keyof EventProps = "on";
const emitter = createNanoEvents<EventProps>();
const board = new five.Board({ repl: false });

board.on("ready", () => {
  const relay = new five.Relay(8);
  relay.open();

  emitter.on("on", () => relay.open());
  emitter.on("off", () => relay.close());
});

const handler = (req: BlitzApiRequest, res: BlitzApiResponse) => {
  const { on, off } = req.query;

  if (on) {
    status = "on";
  } else if (off) {
    status = "off";
  }

  emitter.emit(status);
  return res.end(status);
};

export default handler;

import { resolver } from "blitz";
import got from "got";

export default resolver.pipe(async (toggle: boolean) => {
  const result = await got.get(`http://localhost:3000/${toggle ? "on" : "off"}`);

  return result.body;
});

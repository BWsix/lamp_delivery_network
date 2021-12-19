import { resolver } from "blitz";
import got from "got";

export default resolver.pipe(async () => {
  const result = await got.get("http://localhost:3000/current");

  return result.body;
});

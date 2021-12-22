import { BASE_URL } from "app/constants";
import { resolver } from "blitz";
import got from "got";

export default resolver.pipe(async () => {
  const result = await got.get(BASE_URL + "/current");

  return result.body;
});

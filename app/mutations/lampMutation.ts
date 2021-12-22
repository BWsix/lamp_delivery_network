import { BASE_URL } from "app/constants";
import { resolver } from "blitz";
import got from "got";

export default resolver.pipe(async (toggle: boolean) => {
  const result = await got.get(BASE_URL + (toggle ? "/on" : "/off"));

  return result.body;
});

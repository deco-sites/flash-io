import { Quotes } from "deco-sites/flash-io/loaders/zenquotes.ts";
import { Secret } from "apps/website/loaders/secret.ts";

export interface Prop {
  quantity?: number;
  apiKey: Secret;
}

export default async function apiquotables(
  prop: Prop,
  _req: Request,
  _ctx: unknown,
): Promise<Quotes> {
  const quantity = prop.quantity ?? 1;
  const promises = Array.from({ length: quantity }).map(() =>
    fetch("http://api.quotable.io/random")
  );
  const responses = await Promise.all(promises);
  const data = await Promise.all(responses.map((res) => res.json()));

  return { data: data.map((quote) => quote.content) };
}

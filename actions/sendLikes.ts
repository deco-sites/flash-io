import { AppContext } from "../apps/site.ts";

export interface Props {
  productID: string;
}

export default async function sendLikes(
  props: Props,
  _req: Request,
  ctx: AppContext,
) {
  const data = { productId: props.productID };

  const response = await fetch("https://camp-api.deco.cx/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": String(ctx.secretLikes.get()),
      //   "x-api-key": 'flash-io',
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("ProductId not found or unavailable");

  const res = await response.json();

  return res;
}

import { AppContext } from "../apps/site.ts";

type Props = unknown;

export type Result = {
  total: number;
};

export default async function totalLikes(
  _props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Result> {
  const response = await fetch("https://camp-api.deco.cx/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": String(ctx.secretLikes.get()),
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(
      "Something went wrong! We cannot retrieve total votes information.",
    );
  }

  const res = await response.json();

  return res;
}

import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  utm: string;
}

export default function utmMatcher(props: Props, ctx: MatchContext) {
  const currentUrl = new URL(ctx.request.url);
  const currentCampaign = currentUrl.searchParams.get("utm_campaign");

  return currentCampaign?.includes(props.utm) ?? false;
}

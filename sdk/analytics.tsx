import type { AnalyticsEvent, IEvent } from "apps/commerce/types.ts";

interface PostScoreParams {
  score?: number;
  level?: number;
  character?: string;
}

interface PostScoreEvent extends IEvent<PostScoreParams> {
  name: "post_score";
}

export const sendEvent = <E extends AnalyticsEvent | PostScoreEvent>(
  event: E,
) => {
  console.log(JSON.stringify(event, null, 2));
  globalThis.window.DECO.events.dispatch(event);
};

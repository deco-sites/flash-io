import Icon from "../components/ui/Icon.tsx";
import { total } from "../sdk/useTotalLikes.ts";

export default function LikesTotalHeader() {
  return (
    <div class="flex items-center justify-center gap-1 sm:gap-2 min-w-12 sm:min-w-14">
      <Icon id="Friends" width={24} height={24} />
      <span class="min-w-6 text-center text-xs font-thin">{total.value}</span>
    </div>
  );
}

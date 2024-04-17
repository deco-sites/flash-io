import { useSignal } from "@preact/signals";

import { SendEventOnClick } from "../components/Analytics.tsx";
import Icon from "../components/ui/Icon.tsx";

import { invoke } from "../runtime.ts";
import { useId } from "../sdk/useId.ts";
import { total } from "../sdk/useTotalLikes.ts";

import { useEffect } from "preact/hooks";
import {
  toast,
} from "https://esm.sh/react-toastify@9.1.1?&external=react,react-dom&alias=react/jsx-runtime:preact/jsx-runtime&deps=preact@10.19.2&target=es2022";

export interface Props {
  productID: string;
}

export default function LikeButton({ productID }: Props) {
  const selected = useSignal(false);
  const quantity = useSignal(0);
  const id = useId();

  useEffect(() => {
    const updateTotals = async () => {
      const totalLikes = await invoke["deco-sites/flash-io"].loaders
        .totalLikes();
      const totalLikesProduct = await invoke["deco-sites/flash-io"].loaders
        .totalLikesProduct({ productID });

      total.value = totalLikes.total;
      quantity.value = totalLikesProduct.product;
    };

    updateTotals();
    setInterval(updateTotals, 30000);
  });

  const handleToggleLike = async (e: MouseEvent) => {
    e.preventDefault();
    const result = await invoke["deco-sites/flash-io"].actions.sendLikes({
      productID,
    });
    selected.value = true;
    total.value = result.total;
    quantity.value = result.product;

    toast("Obrigado pelo seu voto", {
      toastId: "likesToast",
    });
  };

  return (
    <>
      <button
        id={id}
        class="left-4 sm:left-auto sm:right-4 top-4 flex items-center justify-center gap-1 p-1 sm:p-2 bg-neutral min-w-14"
        onClick={(e) => handleToggleLike(e)}
      >
        <SendEventOnClick
          id={id}
          event={{
            // deno-lint-ignore ban-ts-comment
            // @ts-ignore
            name: "post_score",
            params: {
              // deno-lint-ignore ban-ts-comment
              // @ts-ignore
              score: quantity.value + 1,
              level: 5,
              character: String(productID),
            },
          }}
        />
        {!selected.value
          ? <Icon id="MoodSmile" width={24} height={24} />
          : <Icon id="MoodCheck" width={24} height={24} />}
        <span
          class={`min-w-4 text-center text-xs font-thin ${
            !selected.value ? "text-gray-500" : "text-primary"
          }`}
        >
          {quantity.value}
        </span>
      </button>
    </>
  );
}

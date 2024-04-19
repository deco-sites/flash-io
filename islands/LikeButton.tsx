import { useSignal } from "@preact/signals";
import Icon from "../components/ui/Icon.tsx";
import { sendEvent } from "../sdk/analytics.tsx";
import { invoke } from "../runtime.ts";
import { total } from "../sdk/useTotalLikes.ts";
import { useEffect } from "preact/hooks";
import { Flip, toast } from "react-toastify";

export interface Props {
  productID: string;
}

export default function LikeButton({ productID }: Props) {
  const selected = useSignal(false);
  const quantity = useSignal(0);

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

  const updateLikes = async (e: MouseEvent) => {
    e.preventDefault();
    const result = await invoke["deco-sites/flash-io"].actions.sendLikes({
      productID,
    });
    selected.value = true;
    total.value = result.total;
    quantity.value = result.product;

    sendEvent({
      name: "post_score",
      params: {
        score: quantity.value + 1,
        level: 5,
        character: String(productID),
      },
    });

    toast.success("Obrigado pelo seu voto!", {
      toastId: "likesToast",
      position: "top-right",
      transition: Flip,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <button
        class="left-4 sm:left-auto sm:right-4 top-4 flex items-center justify-center gap-1 p-1 sm:p-2 bg-neutral min-w-14"
        onClick={(e) => updateLikes(e)}
      >
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

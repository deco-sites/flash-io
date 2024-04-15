import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  title: string;
  listImages: ImageWidget[];
  qtyToRender: number;
}

export default function PartialImageGallery(
  { title, listImages, qtyToRender: qtyToRender = 3 }: Props,
) {
  if (!listImages || listImages?.length < 3) return null;

  return (
    <div class="w-full container max-w-7xl px-4 mx-auto pt-8 lg:pt-10 pb-28 flex flex-col items-center gap-6 relative">
      <h2 class="text-2xl font-light leading-8 lg:leading-10 text-base-content lg:text-4xl text-center">
        {title}
      </h2>

      <div class="flex flex-wrap gap-4 md:gap-6 justify-center items-center ">
        {listImages.slice(0, qtyToRender).map((image) => {
          return (
            <div class="w-80 h-full max-h-64 flex justify-center items-center overflow-hidden rounded md:rounded-xl duration-300 hover:scale-110">
              <Image
                width={320}
                height={240}
                sizes="(max-width: 320px) 100vw, 30vw"
                src={image}
                alt={image}
                decoding="async"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {qtyToRender < listImages?.length && (
        <div class="w-64 max-w-64 absolute bottom-10 left-1/2 -translate-x-2/4">
          <button
            class="btn btn-block"
            {...usePartialSection({
              mode: "replace",
              props: { listImages, qtyToRender: qtyToRender + 1 },
            })}
          >
            Ver mais
          </button>
        </div>
      )}
    </div>
  );
}
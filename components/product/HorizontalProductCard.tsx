import type { Platform } from "../../apps/site.ts";

import { SendEventOnClick } from "../../components/Analytics.tsx";
import Avatar from "../../components/ui/Avatar.tsx";
import WishlistButtonVtex from "../../islands/WishlistButton/vtex.tsx";
import WishlistButtonWake from "../../islands/WishlistButton/vtex.tsx";

import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "../../sdk/url.ts";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Info" | "Price";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    discount?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
    favoriteIcon?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

export interface Props {
  // products: Product[] | null;
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
  // animateImage: boolean;
}

export function ErrorFallback({ error }: { error?: Error }) {
  console.log("error HorizontalProductCard: ", error);

  return (
    <div class="flex lg:flex-row sm:flex-col items-center lg:card card-compact group w-full text-start duration-500 transition-translate ease-in-out lg:hover:-translate-y-2">
      <figure
        class="relative overflow-hidden lg:mt-16"
        style="aspect-ratio: 250 / 250;"
      >
        <a
          href="/culturas"
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full"
        >
          <img
            src="/image/banner-fallback.jpg"
            alt="Adaga Tuareg"
            width="250"
            height="250"
            sizes="(max-width: 640px) 50vw, 20vw"
            loading="lazy"
            class="bg-base-100 col-span-full row-span-full rounded"
          />
        </a>
        <figcaption class="absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 lg:hidden">
        </figcaption>
      </figure>
      <div class="flex flex-grow lg:flex-row flex-col">
        <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-2 lg:w-1/2">
          <div class="flex flex-col gap-0">
            <h2 class="text-base lg:text-lg text-base-content uppercase font-normal">
              Adaga Tuareg
            </h2>
            <div class="text-sm lg:text-sm">
              Adaga de Tuareg tradicional feita em Alpaca
            </div>
          </div>
        </div>
        <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-2 lg:w-1/2">
          <div class="absolute top-2 z-10 flex items-center right-2">
            <div class="block">
              <button
                aria-label="Add to wishlist"
                type="button"
                class="btn no-animation btn-circle btn-ghost gap-2"
              >
                <svg fill="none" width="24" height="24" stroke-width="2">
                  <use href="/sprites.svg?__frsh_c=a0f34246c8d5fca507a715e2b14688378c8f9d4a#Heart">
                  </use>
                </svg>
              </button>
            </div>
            <div class="text-sm bg-base-100 p-[10px]">
              <span class="text-base-content font-bold">0%</span>OFF
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-0  justify-end">
              <div class="line-through text-base-content text-xs font-light ">
                R$&nbsp;00,00
              </div>
              <div class="text-base-content lg:text-sm font-light">
                R$&nbsp;00,00
              </div>
            </div>
            <div class="flex flex-col gap-0">
              <span class="font-light text-base-content text-sm truncate">
                ou 0x de R$ 00,00 sem juros
              </span>
            </div>
          </div>
          <div class="flex-auto flex items-end ">
            <a href="/culturas" aria-label="view product" class="btn btn-block">
              Para Saber Mais
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const WIDTH = 250;
const HEIGHT = 250;

export default function HorizontalProductCard({
  product,
  preload,
  itemListName,
  layout,
  platform,
  index,
}: Props) {
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const relativeUrl = relative(url);
  const skuSelector = variants.map(([value, link]) => {
    const relativeLink = relative(link);
    return (
      <li>
        <a href={relativeLink}>
          <Avatar
            variant={relativeLink === relativeUrl
              ? "active"
              : relativeLink
              ? "default"
              : "disabled"}
            content={value}
          />
        </a>
      </li>
    );
  });
  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="btn btn-block"
    >
      {l?.basics?.ctaText || "Ver produto"}
    </a>
  );
  const skeleton = {
    background:
      "linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%)",
    backgroundSize: "1000px 100%",
  };

  return (
    <div
      id={id}
      class={`flex lg:flex-row sm:flex-col items-center lg:card card-compact group w-full ${
        align === "center" ? "text-center" : "text-start"
      } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}
        ${
        l?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
      }
      `}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative overflow-hidden lg:mt-16"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full rounded ${
              l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                : ""
            }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              class="bg-base-100 col-span-full row-span-full transition-opacity rounded opacity-0 lg:group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          )}
        </a>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${
            l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
          }`}
        >
          {/* SKU Selector */}
          {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )}
          {l?.onMouseOver?.showCta && cta}
        </figcaption>
      </figure>
      <div class="flex flex-grow lg:flex-row flex-col">
        <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-2 lg:w-1/2">
          {/* Prices & Name */}
          {l?.hide?.productName && l?.hide?.productDescription
            ? (
              ""
            )
            : (
              <div class="flex flex-col gap-0">
                {l?.hide?.productName
                  ? (
                    ""
                  )
                  : (
                    <h2
                      class="text-base lg:text-lg text-base-content uppercase font-normal"
                      dangerouslySetInnerHTML={{ __html: name ?? "" }}
                    />
                  )}
                {l?.hide?.productDescription
                  ? (
                    ""
                  )
                  : (
                    <div
                      class="text-sm lg:text-sm"
                      dangerouslySetInnerHTML={{ __html: description ?? "" }}
                    />
                  )}
              </div>
            )}

          {/* SKU Selector */}
          {(!l?.elementsPositions?.skuSelector ||
            l?.elementsPositions?.skuSelector === "Info") && (
            <>
              {l?.hide?.skuSelector
                ? (
                  ""
                )
                : (
                  <ul
                    class={`flex items-center gap-2 w-full overflow-auto p-3 ${
                      align === "center" ? "justify-center" : "justify-start"
                    } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
                  >
                    {skuSelector}
                  </ul>
                )}
            </>
          )}
        </div>

        <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-2 lg:w-1/2">
          {/* Wishlist button */}
          <div
            class={`absolute top-2 z-10 flex items-center
              ${
              l?.elementsPositions?.favoriteIcon === "Top left"
                ? "left-2"
                : "right-2"
            }
              
            `}
          >
            <div
              class={`${l?.hide?.favoriteIcon ? "hidden" : "block"} ${
                l?.onMouseOver?.showFavoriteIcon ? "lg:group-hover:block" : ""
              }`}
            >
              {platform === "vtex" && (
                <WishlistButtonVtex
                  productGroupID={productGroupID}
                  productID={productID}
                />
              )}
              {platform === "wake" && (
                <WishlistButtonWake
                  productGroupID={productGroupID}
                  productID={productID}
                />
              )}
            </div>
            {/* Discount % */}
            {!l?.hide?.discount && (
              <div class="text-sm bg-base-100 p-[10px]">
                <span class="text-base-content font-bold">
                  {listPrice && price
                    ? `${Math.round(((listPrice - price) / listPrice) * 100)}% `
                    : ""}
                </span>
                OFF
              </div>
            )}
          </div>
          {l?.hide?.allPrices
            ? (
              ""
            )
            : (
              <div class="flex flex-col gap-2">
                <div
                  class={`flex flex-col gap-0 ${
                    l?.basics?.oldPriceSize === "Normal"
                      ? "lg:flex-row-reverse lg:gap-2"
                      : ""
                  } ${align === "center" ? "justify-center" : "justify-end"}`}
                >
                  <div
                    class={`line-through text-base-content text-xs font-light ${
                      l?.basics?.oldPriceSize === "Normal" ? "lg:text-sm" : ""
                    }`}
                  >
                    {formatPrice(listPrice, offers?.priceCurrency)}
                  </div>
                  <div class="text-base-content lg:text-sm font-light">
                    {formatPrice(price, offers?.priceCurrency)}
                  </div>
                </div>
                {l?.hide?.installments
                  ? (
                    ""
                  )
                  : (
                    <div class="flex flex-col gap-0">
                      <span class="text-base-content font-light text-sm truncate">
                        ou {installments}
                      </span>
                    </div>
                  )}
              </div>
            )}

          {/* SKU Selector */}
          {l?.elementsPositions?.skuSelector === "Price" && (
            <>
              <div
                class={`flex items-center gap-2 w-full ${
                  align === "center" ? "justify-center" : "justify-between"
                } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {l?.hide?.skuSelector
                  ? (
                    ""
                  )
                  : <ul class="flex items-center gap-2">{skuSelector}</ul>}
              </div>
            </>
          )}
          {!l?.hide?.cta
            ? (
              <div
                class={`flex-auto flex items-end ${
                  l?.onMouseOver?.showCta ? "lg:hidden" : ""
                }`}
              >
                {cta}
              </div>
            )
            : (
              ""
            )}
        </div>
      </div>
    </div>
  );
}

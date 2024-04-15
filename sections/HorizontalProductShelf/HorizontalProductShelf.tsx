export { default } from "../../components/product/HorizontalProductShelf.tsx";

export function LoadingFallback() {
  const skeleton = {
    background:
      "linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%)",
    backgroundSize: "1000px 100%",
  };

  return (
    <div class="w-full container py-8 flex flex-col gap-6 lg:py-10">
      <div class="grid px-0 md:px-5 container">
        <ul class="carousel carousel-center sm:carousel-end sm:gap-1 row-start-2 row-end-5">
          <li class="carousel-item md:w-full w-full">
            <div class="flex lg:flex-row sm:flex-col items-center lg:card card-compact group w-full text-start duration-500 transition-translate ease-in-out lg:hover:-translate-y-2 bg-neutral-content p-6">
              <div class="relative overflow-hidden lg:mt-16">
                <div class="grid grid-cols-1 grid-rows-1 w-full">
                  <div
                    style={skeleton}
                    class="animate-pulse bg-animation w-64 h-64 rounded bg-gray-300"
                  >
                  </div>
                </div>
              </div>

              <div class="flex flex-grow lg:flex-row flex-col">
                <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-2 lg:w-1/2">
                  <h2
                    style={skeleton}
                    class="h-12 md:h-7 w-full animate-pulse rounded"
                  >
                  </h2>
                  <span
                    style={skeleton}
                    class="h-4 md:h-5 w-full animate-pulse rounded"
                  >
                  </span>
                </div>

                <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-2 lg:w-1/2 md:pl-8">
                  <div class="flex flex-col gap-1">
                    <span
                      style={skeleton}
                      class="h-5 w-44 animate-pulse rounded hidden md:inline-flex"
                    >
                    </span>
                    <span
                      style={skeleton}
                      class="h-5 max-w-48 w-full md:max-w-none md:w-44 animate-pulse rounded"
                    >
                    </span>
                  </div>

                  <div class="flex flex-col gap-2 mt-auto max-w-48 md:max-w-none">
                    <span
                      style={skeleton}
                      class="h-12 max-w-48 w-full md:max-w-none md:w-44 animate-pulse rounded"
                    >
                    </span>
                    <span
                      style={skeleton}
                      class="h-12 animate-pulse rounded hidden md:inline-flex"
                    >
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

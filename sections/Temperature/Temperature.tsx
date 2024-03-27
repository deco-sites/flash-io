import { temperatureProps } from "deco-sites/flash-io/loaders/temperature.ts";

export interface Props {
  title?: string;
  location?: string;
  temperature: temperatureProps;
}

export default function Temperature(props: Props) {
  if (!props.temperature?.celsius || (!props.location && !props.title)) {
    return null;
  }

  return (
    <div class="container fixed flex flex-col h-[156px] items-center justify-center md:px-0 mx-auto gap-2 px-4 right-0 text-left w-fit z-20">
      <div class="flex flex-col justify-center items-center rounded-2xl bg-white/40 p-2 ">
        <strong class="text-lg text-center">{props.title}</strong>
        {props.location && (
          <span class="text-base text-center">{props.location}</span>
        )}
      </div>

      <strong class="rounded-full bg-secondary text-lg p-2">
        {props.temperature.celsius}°C
      </strong>
    </div>
  );
}

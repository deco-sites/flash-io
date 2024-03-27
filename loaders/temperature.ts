import weather, { Props as TemperatureProps } from "apps/weather/loaders/temperature.ts";

export interface temperatureProps {
  celsius: number | undefined;
}

export interface Props {
  temperature: TemperatureProps;
}

export default async function temperatureLoader( props: Props,  _req: Request, _ctx: unknown): Promise<temperatureProps> {
  const lat = props.temperature.lat;
  const long = props.temperature.long;
  const temperature = await weather({ lat, long }, _req);

  return {celsius: temperature?.celsius};
}
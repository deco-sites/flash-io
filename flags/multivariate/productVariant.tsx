export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";
import type { Product } from "apps/commerce/types.ts";
import { MultivariateFlag } from "deco/blocks/flag.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";

export type ProdVariant = Product[] | null;

export default function ProductVariant(
  props: MultivariateProps<ProdVariant>,
): MultivariateFlag<ProdVariant> {
  return multivariate(props);
}

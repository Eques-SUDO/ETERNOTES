/// <reference types="react-scripts" />

declare module "react-icons/*" {
  import { FC, SVGProps } from "react";
  const Icon: FC<SVGProps<SVGSVGElement>>;
  export = Icon;
}
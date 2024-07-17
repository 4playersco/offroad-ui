import cuid from "@bugsnag/cuid";
import { FC } from "react";
import { Tooltip as ReactToolTip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";

interface TooltipProps {
  tip: string;
  place?: string;
  type?: string;
  effect?: string;
  children: React.ReactNode;
  [x: string]: any;
}

const Tooltip: FC<TooltipProps> = ({
  tip,
  place = "right",
  type = "dark",
  effect = "solid",
  children,
  ...rest
}) => {
  const id = cuid();

  return (
    <>
      <span data-tooltip-id={id} data-tooltip-content={tip}>
        {children}
      </span>
      <ReactToolTip
        id={id}
        data-tooltip-place={place}
        data-tooltip-type={type}
        data-tooltip-effect={effect}
        {...rest}
      />
      ;
    </>
  );
};

export default Tooltip;

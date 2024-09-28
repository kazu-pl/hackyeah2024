import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { ForwardedRef, forwardRef, useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

import Box from "@mui/material/Box";

export interface ButtonProps extends MuiButtonProps {
  isLoading?: boolean;
  to?: string;
  onClickPromise?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>;
}

const Button = forwardRef(
  (
    {
      isLoading,
      fullWidth,
      disabled,
      color,
      size = "medium",
      onClick,
      onClickPromise,
      to,
      ...rest
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const [isPromiseLoading, setIsPromiseLoading] = useState(false);

    const circularProgressSize =
      size === "large" ? 24 : size === "medium" ? 22 : 20;

    const handleBtnClick: ButtonProps["onClick"] = async (e) => {
      if (onClick) {
        onClick(e);
      }

      if (onClickPromise) {
        setIsPromiseLoading(true);
        try {
          await onClickPromise(e);
          setIsPromiseLoading(false);
        } catch {
          setIsPromiseLoading(false);
        }
      }
    };

    return (
      <Box
        className="Button-wrapper"
        sx={{
          position: "relative",
          ...(fullWidth && {
            display: "block",
            width: "100%",
          }),
          ...(!fullWidth && {
            display: "inline-block",
          }),
        }}
      >
        <MuiButton
          fullWidth={fullWidth}
          disabled={isPromiseLoading || isLoading || disabled}
          color={color}
          size={size}
          ref={ref}
          onClick={handleBtnClick}
          LinkComponent={to ? Link : undefined}
          // @ts-expect-error it won't thrown any error
          to={to}
          {...rest}
        />
        {(isPromiseLoading || isLoading) && (
          <CircularProgress
            color={color}
            size={circularProgressSize}
            sx={{
              position: "absolute",
              top: `calc(50% - ${circularProgressSize / 2}px)`,
              left: `calc(50% - ${circularProgressSize / 2}px)`,
            }}
          />
        )}
      </Box>
    );
  }
);

export default Button;

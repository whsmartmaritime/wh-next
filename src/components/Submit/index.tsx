"use client";
import Button from "../Button";
import type { ButtonProps } from "../Button";
import React from "react";

export type SubmitProps = ButtonProps & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

export default function Submit({
  children,
  className,
  arrowRotation = 0,
  onClick,
  ...rest
}: SubmitProps) {
  // Không dùng href, chỉ dùng cho submit hoặc button có onClick
  return (
    <Button className={className} arrowRotation={arrowRotation} {...rest}>
      <span
        onClick={onClick}
        // Đảm bảo không ảnh hưởng hiệu ứng flip
        style={{ display: "contents" }}
      >
        {children}
      </span>
    </Button>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { CSSProperties } from "react";
import Icon from "./icon";
import "../styles/back_btn.css";

export default function BackBtn({
  className,
  style,
  icon,
  id,
}: {
  className?: string;
  style?: CSSProperties;
  icon?: string;
  id?: string;
}) {
  const router = useRouter();

  return (
    <button
      type='button'
      className={`backBtn ${className}`}
      style={{ ...style }}
      id={id}
      onClick={_ => router.back()}
    >
      <Icon>{icon ?? "keyboard_double_arrow_left"}</Icon>
    </button>
  );
}

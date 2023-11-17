import { CSSProperties, ReactElement } from "react";

export default function Icon({
  children,
  className,
  style,
  id,
}: {
  children: string; //ReactElement | ReactElement[];
  className?: string;
  id?: string;
  style?: CSSProperties;
}) {
  return (
    <i
      className={`material-symbols-outlined icon__ ${className}`}
      style={{
        userSelect: "none",
        ...style,
      }}
      id={id}
    >
      {children}
    </i>
  );
}

import { CSSProperties, ReactElement } from "react";
//import "../styles/icon.css";

export default function Icon({
  children,
  className,
  style,
  id,
}: {
  children: string;
  className?: string;
  id?: string;
  style?: CSSProperties;
}): JSX.Element {
  return (
    <i
      className={`material-symbols-outlined __icon__ ${className}`}
      style={{
        ...style,
      }}
      id={id}
    >
      {children}
    </i>
  );
}

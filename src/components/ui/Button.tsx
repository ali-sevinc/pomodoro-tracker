import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
  onClick?: () => void;
  type?: "primary" | "secondary" | "danger";
}
export default function Button({ children, onClick, type }: PropsType) {
  return (
    <button className={`button ${type}`} onClick={onClick ? onClick : () => {}}>
      {children}
    </button>
  );
}

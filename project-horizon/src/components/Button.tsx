import type { ReactNode, MouseEventHandler } from "react";
export interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        variant === "primary" ? "save-btn" : "secondary-btn",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
export default Button;
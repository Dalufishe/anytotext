import React from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
  isDisabled?: boolean;
  styleType?: "default" | "converting" | "complete" | "normal";
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  isDisabled = false,
  styleType = "default",
}) => {
  const styles = {
    default: "bg-upload-radial-gradient hover:bg-blue-600 focus:ring-blue-300 text-white border",
    converting: "bg-converting-radial-gradient hover:bg-yellow-600 focus:ring-yellow-300 text-[rgba(12,112,58,1)] border",
    complete: "bg-complete-radial-gradient hover:bg-green-600 focus:ring-green-300 text-[rgba(12,112,58,1)] border",
    normal: "bg-normal-radial-gradient hover:bg-white-600 focus:ring-white-300 text-black border"
  };

  return (
    <button
      className={`py-2 px-4 rounded focus:outline-none focus:ring-2 ${styles[styleType]} ${
        isDisabled ? "cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default Button;

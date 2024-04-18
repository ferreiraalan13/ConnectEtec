import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface IOwnProps {
  children: ReactNode;
  label?: string;
  route?: string;
  customFunction?(): void;
}

const ItensMenu2: React.FC<IOwnProps> = ({
  children,
  label,
  route,
  customFunction,
}) => {
  const navigate = useNavigate();
  function handleCallFunction() {
    if (route) {
      navigate(route);
    } else if (customFunction) {
      customFunction();
    }
  }

  return (
    <li
      className="text-black text-xl flex items-center gap-x-4 cursor-pointer p2 hover:bg-gray-50 rounded-md mt-6"
      onClick={handleCallFunction}
    >
      {" "}
      {children}
      {label}
    </li>
  );
};
export default ItensMenu2;

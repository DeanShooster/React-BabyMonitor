import { useState } from "react";

import { Loader } from "../components/Loader";

interface IUseLoader {
  size: number;
  color?: string;
  removeAbsolute?: true;
}

export const useLoader = ({ size, color, removeAbsolute }: IUseLoader) => {
  const loader = <Loader size={size} color={color} removeAbsolute={removeAbsolute} />;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return { isLoading, setIsLoading, loader };
};

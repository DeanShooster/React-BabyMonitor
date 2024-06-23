import { useContext } from "react";
import { BabyContext } from "../../Context/BabyContext";

import { LoginRegister } from "../LoginRegister";

export const Guard = (props: any) => {
  const { baby } = useContext(BabyContext);

  return <>{baby ? props.children : <LoginRegister />}</>;
};

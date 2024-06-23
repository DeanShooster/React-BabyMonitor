import { BabyUser } from "./BabyUser";
import { Navigation } from "./Navigation";
import { Logo } from "./Logo";

import "./index.scss";

export const Header = () => {
  return (
    <header>
      <BabyUser />
      <Navigation />
      <Logo />
    </header>
  );
};

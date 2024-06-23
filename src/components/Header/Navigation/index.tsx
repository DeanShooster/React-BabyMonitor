import { routes } from "../../../Routes";
import { NavLink } from "react-router-dom";

import "./index.scss";
import { BabyBottle, Bed, Diaper } from "../../../assets";
import { Image } from "../../Image";

interface INav {
  path: string;
  icon: string;
  className: string;
}

export const Navigation = () => {
  const navBar: INav[] = [
    {
      path: routes.Feeding,
      icon: BabyBottle,
      className: "bottle",
    },
    {
      path: routes.Sleep,
      icon: Bed,
      className: "bed",
    },
    {
      path: routes.Diaper,
      icon: Diaper,
      className: "diaper",
    },
  ];

  const activePage = ({ isActive }: any) => {
    return isActive ? { boxShadow: "0 0 15px 0 #fff", outline: "1px solid #fff" } : undefined;
  };

  return (
    <nav>
      {navBar.map((navItem: INav, index: number) => {
        return (
          <NavLink key={index} to={navItem.path} className={navItem.className} style={activePage}>
            <Image imageSrc={navItem.icon} />
          </NavLink>
        );
      })}
    </nav>
  );
};

import { useLocation } from "react-router-dom";

import { logo } from "../assets/index";
import { navLinks } from "../constant/LandingPageConstant";

export default function NavBar() {
  const location = useLocation();

  const isMapPage = location.pathname === "/Map"; // Vérifie si nous sommes sur la page de la carte

  return (
    <div
      className={`fixed top-0 left-0 z-20 flex w-full px-20 ${isMapPage ? "bg-gray-900" : "bg-transparent"} place-content-between`}
    >
      <div className="">
        <a href="/">
          <img src={logo} alt="logo" className="w-32 p-4" />
        </a>
      </div>
      <div className="flex items-center">
        <ul className="flex gap-10">
          {navLinks.map((link) => (
            <li key={link.id} className="text-xl text-neutral-50">
              <a href={link.id}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

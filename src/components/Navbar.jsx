import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useCanvasDrawer } from "~/Contexts/canvasDrawerContext";

const Navbar = () => {
  const { toggleCanvasDrawer, setToggleCanvasDrawer } = useCanvasDrawer();

  return (
    <nav className="flex laptop:hidden w-full h-16 fixed items-center px-8">
      <button
        onClick={() => setToggleCanvasDrawer(!toggleCanvasDrawer)}
        className="text-2xl"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </nav>
  );
};

export default Navbar;

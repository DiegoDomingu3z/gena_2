import React from "react";

const SideNavToggle = ({ sideNavOpen, setSideNavOpen }) => {
  return (
    <div className="flex mr-5 z-50 laptop:hidden h-8 items-center">
      <label className={`btn btn-circle swap swap-rotate hover:bg-opacity-90`}>
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" onClick={() => setSideNavOpen(!sideNavOpen)} />

        {/* hamburger icon */}
        <svg
          className="swap-off fill-black"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        {/* close icon */}
        <svg
          className="swap-on fill-black"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
        </svg>
      </label>
    </div>
  );
};

export default SideNavToggle;

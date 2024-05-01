import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatImgString } from "../../../func/resuableFunctions";
import SideNavToggle from "./SideNavToggle";
import { logout } from "../../../store/Account/thunks";
import { useRouter } from "next/router";
import Link from "next/link";

const GenaNav = ({ displayTitle, sideNavOpen, setSideNavOpen }) => {
  const user = useSelector((state) => state.Account);
  const dispatch = useDispatch();
  const router = useRouter();

  const logUserOut = async () => {
    await router.push("/");
    dispatch(logout(user.accessToken));
  };

  return (
    <div className="w-full flex justify-center bg-white shadow-sm">
      <div className="navbar bg-white px-8 w-full">
        <SideNavToggle
          sideNavOpen={sideNavOpen}
          setSideNavOpen={setSideNavOpen}
        />
        <div className="flex-1">
          <span className="">{displayTitle}</span>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border">
                <img
                  width={20}
                  height={20}
                  alt="Profile Image"
                  src={`${formatImgString(
                    user.account.firstName,
                    user.account.lastName,
                    "jpg"
                  )}`}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[999] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link
                  href={`/profile/${user.account._id}`}
                  className="justify-between"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button onClick={() => logUserOut()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenaNav;

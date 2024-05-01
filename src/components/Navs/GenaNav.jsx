import React from 'react'
import { useSelector } from 'react-redux';
import { formatImgString } from '../../../func/resuableFunctions';
import { Avatar } from 'antd';

const GenaNav = ({displayTitle}) => {
  const user = useSelector((state) => state.Account);

  return (
  <div className='w-full flex justify-center bg-white shadow-sm'>
    <div className="navbar bg-white w-[calc(100%_-_10rem)]">
      <div className="flex-1">
        <span className='bg-gray-200 p-2 rounded text-xl'>{displayTitle}</span>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full border">
              {user.account.firstName && <img width={20} height={20} alt='Profile Image' src={`${formatImgString(
                    user.account.firstName,
                    user.account.lastName,
                    "jpg"
                  )}`} />}
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
  </div>
</div>
  )
}

export default GenaNav
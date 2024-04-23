import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Statistic } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "~/components/Layout";
import Signup from "~/components/Signup";
import UserList from "~/components/Users/UserList";
import { getUsers } from "../../store/Users/Thunks";
import CountUp from 'react-countup';
const Users = () => {
  const account = useSelector((state) => state.Account.account);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState('');
  const formatter = (value) => <CountUp end={value} separator="," />;
  let users = useSelector((state) => state.Users.users)
  useEffect(() => {
    dispatch(getUsers())
    if (account.privileges != "admin") {
      router.push("/start-new-order");
    }
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });
  return (
    <Layout title={"Gena | Add User"}>
      <div className={"flex flex-col pl-20 pr-20 pt-20 pb-4"}>
        <div className="flex items-end">
          <div className="mr-auto">
            <h1 className="text-3xl font-medium font-genaPrimary flex">Users (<Statistic value={users.length} formatter={formatter}/>)</h1>
          </div>
          <div className="flex items-center">
            <div className="me-4 flex items-center">
          <label htmlFor="labelSearch">
              <FontAwesomeIcon
                className="p-3 cursor-pointer rounded-full drop-shadow-sm bg-[#233042] text-white relative bottom-[-6px] me-3"
                icon={faMagnifyingGlass}
                />
            </label>
            <input
                 onChange={(e) => setSearchTerm(e.target.value)}
                id="userSearch"
                name="userSearch"
                type="text"
                className="laptop:w-full w-full drop-shadow-md bg-white text-[#233042] rounded-md h-9 transition-all ease-in-out
                outline-none focus:drop-shadow-xl focus:shadow-[0px_-2px_#374151_inset] p-5"
                placeholder="Search Employee"
                />
                </div>
            <Button type="primary" className="bg-accent transform transition-transform duration-300 hover:scale-105"
            onClick={() => setOpen(true)}>
           <FontAwesomeIcon icon={faPlus} /> {" "} <span className="ms-2">Add User</span>
            </Button>
          </div>
        </div>
        <div className="mb-10 mt-5 border-t border-gray-300 rounded-full" />
        
      <UserList open={open} setOpen={setOpen} users={filteredUsers}/>
      </div>
    </Layout>
  );
};

export default Users;

import { Card, Input } from "antd";
import { useSelector } from "react-redux";
import { formatImgString } from "../../../func/resuableFunctions";
const UserSettings = () => {
  const user = useSelector((state) => state.Account);

  return (
    <div className="mb-5">
      <div className="w-full max-w-[800px] m-auto">
        <Card title="Personal info">
          <div className="flex gap-5">
            <div className="w-28 h-28 rounded-full border">
              <img
                width={112}
                height={112}
                className="rounded-full"
                alt="Profile Image"
                src={`${formatImgString(
                  user.account.firstName,
                  user.account.lastName,
                  "jpg"
                )}`}
              />
            </div>
            <div className="grow">
              <div>
                <label
                  className="label label-text font-semibold"
                  htmlFor="firstName"
                >
                  Name
                </label>
                <div className="flex w-full gap-5">
                  <Input
                    id="firstName"
                    placeholder={user.account.firstName}
                    className="w-full"
                    disabled
                  />
                  <Input
                    id="lastName"
                    placeholder={user.account.lastName}
                    className="w-full"
                    disabled
                  />
                </div>
                <div className="flex w-full gap-5 pt-2">
                  <div className="w-full">
                    <label
                      className="label label-text font-semibold"
                      htmlFor="department"
                    >
                      Department
                    </label>
                    <Input
                      id="department"
                      placeholder={user.account.department}
                      className="w-full"
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="label label-text font-semibold"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      placeholder={user.account.email}
                      className="w-full"
                      disabled
                    />
                  </div>
                </div>
                <div className="flex w-full gap-5 pt-2">
                  <div className="w-full">
                    <label
                      className="label label-text font-semibold"
                      htmlFor="teamLead"
                    >
                      Team Lead
                    </label>
                    <Input
                      id="teamLead"
                      placeholder={user.account.teamLead}
                      className="w-full"
                      disabled
                    />
                  </div>
                  <div className="w-full">
                    <label
                      className="label label-text font-semibold"
                      htmlFor="groupLead"
                    >
                      Group Lead
                    </label>
                    <Input
                      id="groupLead"
                      placeholder={user.account.groupLead}
                      className="w-full"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserSettings;

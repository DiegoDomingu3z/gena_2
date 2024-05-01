import React, { useState } from "react";
import { Button, Card, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../store/Account/thunks";
import useGenaToast from "../toasts-modals/GenaToast";

const PasswordSettings = () => {
  const user = useSelector((state) => state.Account.account);
  const dispatch = useDispatch();
  const { successToast, errorToast, contextHolder } = useGenaToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleCancel = () => {
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    const token = sessionStorage.getItem("accessToken");
    const id = user._id;
    const values = { ...user, password: password };
    const res = await dispatch(updateUser({ token, id, values }));

    if (res.meta.requestStatus === "fulfilled") {
      successToast("Your password has been updated");
      setPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <div className="my-5">
      {contextHolder}
      <div className="w-full max-w-[800px] m-auto">
        <Card
          title="Password settings"
          extra={error ? <span className="text-error">{error}</span> : ""}
        >
          <Form onFinish={handleSubmit}>
            <div className="flex gap-5">
              <div className="w-full">
                <label className="label-text font-semibold" htmlFor="password">
                  New password
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  className="mt-2"
                  id="password"
                  name="password"
                  placeholder="•••••••••"
                  value={password}
                  onChange={(e) => {
                    error && setError("");
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="w-full">
                <label
                  className="label-text font-semibold"
                  htmlFor="confirmPassword"
                >
                  Confirm new password
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  className="mt-2"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="•••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    error && setError("");
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex mt-5 gap-3">
              {(password || confirmPassword) && (
                <span
                  className="transition-all cursor-pointer ease-in-out hover:text-[#1677ff]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "hide" : "show"}
                </span>
              )}
              <Button
                onClick={() => handleCancel()}
                disabled={password === ""}
                danger
                className="ml-auto"
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                disabled={password === ""}
                type="primary"
                className="bg-[#1677ff] border-none"
              >
                Save
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default PasswordSettings;

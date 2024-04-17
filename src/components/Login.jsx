import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/Account/thunks";
import { useRouter } from "next/router";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setResetShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showForgotPasswordComponent, setForgotPasswordComponent] = useState(false)
  const savedUser = Cookies.get("gena_userName");
  const savedPass = Cookies.get("gena_pass");
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.Account);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    token && router.push("/start-new-order");
  }, [user]);

  return (
    <div className="h-full flex flex-col justify-center items-center gap-y-10">
      <Image
        src="/images/GENA-Logo.png"
        className="bg-[#233043] rounded p-2"
        width={80}
        height={80}
        alt="GENA Image"
      />
      <div className="md:w-2/5 w-4/5 self-center justify-self-center bg-white rounded-xl p-5 drop-shadow-lg">
        {!showForgotPasswordComponent ? (
        <Formik
          initialValues={{
            userName: savedUser ? savedUser : "",
            password: savedPass ? savedPass : "",
          }}
          onSubmit={async (values) => {
            let user = Cookies.get("gena_userName");
            let pass = Cookies.get("gena_pass");
            if (!user && !pass) {
              Swal.fire({
                title: "Save Password?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Save Password",
                cancelButtonText: "Don't Save",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(login(values));
                  Cookies.set("gena_userName", values.userName, {
                    expires: 365,
                  });
                  Cookies.set("gena_pass", values.password, { expires: 365 });
                } else {
                  dispatch(login(values));
                }
              });
            } else if (
              savedPass != values.password ||
              savedUser != values.userName
            ) {
              Swal.fire({
                title: "Update login information to computer?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Save Password",
                cancelButtonText: "Don't Save",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(login(values));
                  Cookies.set("gena_userName", values.userName, {
                    expires: 365,
                  });
                  Cookies.set("gena_pass", values.password, { expires: 365 });
                } else {
                  dispatch(login(values));
                }
              });
            } else {
              dispatch(login(values));
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 md:space-y-6">
              <div>
                <div className="flex">
                  <label
                    htmlFor="Username"
                    className="block mb-2 text-sm font-medium text-gray-900 mr-auto"
                  >
                    Username
                  </label>
                  {user.account === "ACCOUNT DOES NOT EXISTS" && (
                    <p className="text-red-500 text-sm">
                      * User does not exist
                    </p>
                  )}
                </div>
                <Field
                  type="text"
                  name="userName"
                  autoComplete="userName"
                  id="userName"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    user.account === "ACCOUNT DOES NOT EXISTS" &&
                    "animate-wiggle border-red-500"
                  }`}
                  placeholder="Enter username"
                  required=""
                />
              </div>
              <div>
                <div className="flex">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 mr-auto"
                  >
                    Password
                  </label>
                  {user.account === "INCORRECT Password" && (
                    <p className="text-red-500 text-sm">* Incorrect Password</p>
                  )}
                </div>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    autoComplete="password"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      user.account === "INCORRECT Password" &&
                      "animate-wiggle border-red-500"
                    }`}
                    required=""
                  />
                  <FontAwesomeIcon
                    className={`absolute top-[35%] right-[10%] laptop:right-[6%] hover:cursor-pointer dark:fill-white w-[20px] ${
                      showPassword && "hidden"
                    }`}
                    onClick={() => setShowPassword(true)}
                    icon={faEye}
                  />
                  <FontAwesomeIcon
                    className={`absolute top-[35%] right-[9.9%] laptop:right-[5.9%] dark:fill-white hover:cursor-pointer w-[20px] ${
                      !showPassword && "hidden"
                    }`}
                    onClick={() => setShowPassword(false)}
                    icon={faEyeSlash}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between"></div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-white bg-[#1baded] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </Form>
          )}
        </Formik>
          ) : 
          <div>
          <Formik initialValues={{
            userName: "",
            password: "",
            confirmPassword: ""
          }}>
            <Form className="space-y-4 md:space-y-6">
              <div className="relative">
              <label
                    htmlFor="userName"
                    className="block mb-2 text-sm font-medium text-gray-900 mr-auto"
                  >
                    Email/Username/Full Name
                  </label>
            <Field
                  type='text'
                  name="userName"
                  autoComplete="userName"
                  id="userName"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
                  placeholder="Email, Username, or Full Name"
                  required={true}
                  />
                <FontAwesomeIcon
                    className={`absolute top-[53%] right-[10%] laptop:right-[6%] hover:cursor-pointer dark:fill-white w-[20px] ${
                      showPassword && "hidden"
                    }`}
                    onClick={() => {
                      setResetShowPassword(!showResetPassword)
                    }}
                    icon={showResetPassword ? faEye : faEyeSlash}
                    />
                       <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 mr-auto mt-3"
                  >
                    Password
                  </label>
            <Field
                  type={!showResetPassword ? "text" : "password"}
                  name="password"
                  autoComplete="password"
                  id="password"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="New Password"
                  required={true}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 mr-auto mt-3"
                  >
                    Confirm password
                  </label>
            <Field
                  type={!showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="confirmPassword"
                  id="userName"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 }`}
                  placeholder="Confirm Password"
                  required={true}
                  />
                  <FontAwesomeIcon
                    className={`absolute top-[89%] right-[10%] laptop:right-[6%] hover:cursor-pointer dark:fill-white w-[20px] ${
                      showPassword && "hidden"
                    }`}
                    onClick={() => {
                      setShowConfirmPassword(!showConfirmPassword)

                    }}
                    icon={showConfirmPassword ? faEye : faEyeSlash}
                    />
                  </div>
                 <button
                type="submit"
                className="w-full text-white bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Reset Password
              </button>
            </Form>
          </Formik>  
          </div>}
        {/* <div className={`text-end mt-4
        ${showForgotPasswordComponent ? 'text-[#1baded]' : 'text-red-500 '}`}>
          <button className=" hover:font-semibold ease-in-out transition-all" onClick={() => setForgotPasswordComponent(!showForgotPasswordComponent)}>{showForgotPasswordComponent ? 'Back to sign in' : 'Forgot Password?'}</button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;

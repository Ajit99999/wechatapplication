import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Signup = () => {
  const { authState, signUp } = useAuth();
  const { isLogged } = useSelector((store) => store.currentUser);
  const navigate = useNavigate();
  const formik = useFormik({
    onSubmit: (values) => {
      signUp({
        email: values.userEmail,
        password: values.userPassword,
        name: values.userName,
      });
      formik.resetForm({
        values: {
          userEmail: "",
          userPassword: "",
          confirmPassword: "",
          userName: "",
        },
      });
    },
    initialValues: {
      userEmail: "",
      userPassword: "",
      confirmPassword: "",
      userName: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Please enter your name"),
      userEmail: Yup.string()
        .required("Please enter your email")
        .email("Please enter correct email address format"),
      userPassword: Yup.string()
        .required("Please enter your password")
        .min(4, "Please enter minimum 4 charaters"),
      confirmPassword: Yup.string()
        .required("Please enter your password")
        .min(4, "Please enter minimum 4 charaters")
        .test("is-same", "Please enter same password ", () => {
          return userPassword.value === confirmPassword.value ? true : false;
        }),
    }),
    initialErrors: {
      userEmail: "",
      userPassword: "",
      confirmPassword: "",
      userName: "",
    },
  });
  useEffect(() => {
    if (isLogged) {
      navigate("/chats");
    } else {
      navigate(1);
    }
  }, [isLogged]);
  return (
    <div className="w-fit h-auto border mx-auto shadow-md my-20 py-6 px-24 max-sm:px-8">
      <div className="my-2">
        <p className=" text-center text-2xl font-semibold">
          {" "}
          Sign Up To We Chat
        </p>
      </div>
      <form
        className="flex items-center flex-col"
        onSubmit={formik.handleSubmit}
      >
        <div className="my-2 w-min">
          <input
            className="w-auto h-auto px-4 py-2 border border-black outline-0 rounded-sm"
            type="text"
            name="userName"
            id="userName"
            placeholder="Enter your name"
            {...formik.getFieldProps("userName")}
          />
          {formik.touched.userName && formik.errors.userName && (
            <p className="text-red-600"> {formik.errors.userName}</p>
          )}
        </div>

        <div className="my-2 w-min">
          <input
            className="w-auto h-auto px-4 py-2 border border-black outline-0 rounded-sm"
            type="text"
            name="userEmail"
            id="userEmail"
            placeholder="Enter your email"
            {...formik.getFieldProps("userEmail")}
          />
          {formik.touched.userEmail && formik.errors.userEmail && (
            <p className="text-red-600"> {formik.errors.userEmail}</p>
          )}
        </div>

        <div className="my-2 w-min">
          <input
            className="w-auto h-auto px-4 py-2 border border-black outline-0 rounded-sm"
            type="password"
            name="userPassword"
            id="userPassword"
            placeholder="Enter your password"
            {...formik.getFieldProps("userPassword")}
          />
          {formik.touched.userPassword && formik.errors.userPassword && (
            <p className="text-red-600"> {formik.errors.userPassword}</p>
          )}
        </div>
        <div className="my-2 w-min">
          <input
            className="w-auto h-auto px-4 py-2 border border-black outline-0 rounded-sm"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Re-enter your password"
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-600"> {formik.errors.confirmPassword}</p>
          )}
        </div>
        {authState.isLoading && (
          <div className="my-2 w-min">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="2"
              animationDuration="0.75"
              width="48"
              visible={true}
            />
          </div>
        )}

        <div className="my-2">
          <button
            type="submit"
            className=" bg-blue-300 hover:bg-blue-400 w-auto h-auto px-6 py-2 border border-black outline-0 rounded-sm"
          >
            Sign Up
          </button>
        </div>

        <div className="my-2 w-fit">
          {authState.errorValue && (
            <p className="text-red-600"> {authState.errorValue}</p>
          )}
        </div>
        <div className="my-2 flex gap-2 items-center">
          <p>Already have an account!</p>
          <button
            className="  hover:bg-blue-100  w-auto h-auto px-1 py-0.5 border border-black outline-0 rounded-sm"
            onClick={() => {
              navigate("/");
            }}
          >
            Click here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

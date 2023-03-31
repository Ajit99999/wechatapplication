import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { RotatingLines } from "react-loader-spinner";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const { authState, signIn } = useAuth();
  const { isLogged } = useSelector((store) => store.currentUser);
  const formik = useFormik({
    onSubmit: (values) => {
      signIn({
        email: values.userEmail,
        password: values.userPassword,
      });
      formik.resetForm({
        values: {
          userEmail: "",
          userPassword: "",
        },
      });
    },
    initialValues: {
      userEmail: "",
      userPassword: "",
    },
    validationSchema: Yup.object({
      userEmail: Yup.string()
        .required("Please enter your email")
        .email("Please enter correct email address format"),
      userPassword: Yup.string()
        .required("Please enter your password")
        .min(4, "Please enter minimum 4 charaters"),
    }),
    initialErrors: {
      userEmail: "",
      userPassword: "",
    },
  });
  useEffect(() => {
    if (authState?.user?.id) {
      navigate("/chats");
    }
  }, [authState?.user?.id]);
  useEffect(() => {
    if (isLogged) {
      navigate("/chats");
    } else {
      navigate("/");
    }
  }, [isLogged]);
  return (
    <div className="w-fit h-auto border mx-auto shadow-md my-20 py-6 px-20 max-sm:px-8 ">
      <div className="my-2">
        <p className=" text-center text-2xl font-semibold">
          {" "}
          Sign In To We Chat
        </p>
      </div>
      <form
        className="flex items-center flex-col"
        onSubmit={formik.handleSubmit}
      >
        <div className="my-2 w-min">
          <input
            className="  w-auto h-auto px-4 py-2 border border-black outline-none rounded-sm"
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
            className="w-auto h-auto px-4 py-2 border border-black outline-none rounded-sm"
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
            className="w-auto hover:bg-blue-400 bg-blue-300 h-auto px-6 py-2 border border-black outline-none rounded-sm"
          >
            Log In
          </button>
        </div>
        <div className="my-2 w-fit">
          {authState.errorValue && (
            <p className="text-red-600"> {authState.errorValue}</p>
          )}
        </div>
        <div className="my-2 flex gap-2 items-center">
          <p>Don't have an account!</p>
          <button
            className="  hover:bg-blue-100 rounded-sm  w-auto h-auto px-1 py-0.5 border border-black outline-0"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Click here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

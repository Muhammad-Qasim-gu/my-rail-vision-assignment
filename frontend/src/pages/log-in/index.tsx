import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginText } from "@/common/constant";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(loginText.invalidEmailForkik)
    .required(loginText.emailRequired),
  password: Yup.string()
    .min(6, loginText.passwordLength)
    .required(loginText.passwordRequired),
});

const Login: React.FC = () => {
  const navigate = useNavigate();

  // const handleSubmit = async (values: { email: string; password: string }) => {
  //   try {
  //     debugger;
  //     const response = await fetch(loginText.loginApi, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(values),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     localStorage.setItem("isAuthenticated", "true");
  //     toast.success(loginText.loginSuccess);

  //     setTimeout(() => {
  //       navigate("/home");
  //     }, 1500);
  //   } catch (error) {
  //     console.error(loginText.errorDuringLogin, error);
  //     toast.error(loginText.toasterError);
  //   }
  // };

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await fetch(loginText.loginApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userId", data.userId); 
        toast.success(loginText.loginSuccess);
  
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        toast.error(data.message || loginText.toasterError);
      }
    } catch (error) {
      console.error(loginText.errorDuringLogin, error);
      toast.error(loginText.toasterError);
    }
  };
  
  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl7iuGj64elgT7s705WjL8cYxOFTAxDLytIA&s')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      <div className="flex items-center justify-center h-full relative z-10">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="email" className="block font-medium mb-1">
                    {loginText.email}
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block font-medium mb-1">
                    {loginText.password}
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              {loginText.doYouHaveAccount}
              <Link
                to={loginText.signUpLink}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                {loginText.signUp}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

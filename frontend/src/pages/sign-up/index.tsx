import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate } from "react-router-dom";
import { signUpText } from "@/common/constant";

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, signUpText.userNameLength)
    .max(15, signUpText.userNAmeMax)
    .required(signUpText.userNAmeRequires),
  email: Yup.string()
    .email(signUpText.invalidEmailFormat)
    .required(signUpText.emailRequired),
  password: Yup.string()
    .min(6, signUpText.passwordMustBe)
    .required(signUpText.passwordRequired),
});

const SignUp: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(signUpText.signUpLink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`${signUpText.httpError} ${response.status}`);
      }

      const data = await response.json();
      toast.success(signUpText.toasterSuccess);
      setIsRegistered(true);
      console.log("User created:", data);
    } catch (error) {
      toast.error(signUpText.toasterError);
      console.error("Error:", error);
    }
  };

  if (isRegistered) {
    return <Navigate to={signUpText.loginLink} replace />;
  }

  return (
    <div
      className="h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url(/assets/train.jpg)" }}
    >
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="flex items-center justify-center h-full relative z-10">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="name" className="block font-medium mb-1">
                    {signUpText.userName}
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter your username"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block font-medium mb-1">
                    {signUpText.email}
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
                    {signUpText.password}
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
                  {isSubmitting ? "Submitting..." : "Sign Up"}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm">
                    {signUpText.alreadyAccount}
                    <Link
                      to={signUpText.loginLInk}
                      className="text-blue-600 underline"
                    >
                      {signUpText.loginHere}
                    </Link>
                    .
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

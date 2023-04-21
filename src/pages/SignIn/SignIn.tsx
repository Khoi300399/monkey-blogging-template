import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DispathType, RootState } from "../../redux/config";
import { Field } from "../../components/Field";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { IconEyeClose, IconEyeOpen } from "../../components/Icon";
import AuthenticationTemplate from "../../templates/AuthenticationTemplate/AuthenticationTemplate";
import { loginApi } from "../../redux/userReducer/userReducer";
import { useSelector } from "react-redux";

type Props = {};

type Values = {
  email: string;
  password: string;
};

const SignIn = (props: Props) => {
  const dispatch = useDispatch<DispathType>();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.userReducer);
  const initialValues: Values = {
    email: "",
    password: "",
  };
  const [togglePassword, setTogglePassword] = useState<Boolean>(true);

  useEffect(() => {
    document.title = "Login Page";
    console.log("userInfo", userInfo);
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="authentication wrapper">
      <AuthenticationTemplate>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Please enter valid email address")
              .required("Please enter your email address"),
            password: Yup.string()
              .min(8, "Your password must be at least 8 characters or greater")
              .max(15, "Your password must be 15 characters or less")
              .required("Please enter your password"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dispatch(loginApi(values));
              toast.success("Login successfully!");
              setSubmitting(false);
              navigate("/");
            }, 500);
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form className="authentication-form">
                <Field>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Enter your email address"
                  />
                </Field>
                <Field>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={togglePassword ? "password" : "text"}
                    name="password"
                    placeholder="Enter your pasword"
                  >
                    {togglePassword ? (
                      <IconEyeClose
                        onClick={() => {
                          setTogglePassword(false);
                        }}
                      />
                    ) : (
                      <IconEyeOpen
                        onClick={() => {
                          setTogglePassword(true);
                        }}
                      />
                    )}
                  </Input>
                </Field>
                <p className="text-signin">
                  Dont have an account?{" "}
                  <Link to={"/sign-up"} className="link-signin">
                    Sign up
                  </Link>
                </p>
                <Button
                  type="submit"
                  className="primary"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </Form>
            );
          }}
        </Formik>
      </AuthenticationTemplate>
    </div>
  );
};

export default SignIn;

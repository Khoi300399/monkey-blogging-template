import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { Field } from "../../components/Field";
import { IconEyeClose, IconEyeOpen } from "../../components/Icon";
import { Button } from "../../components/Button";
import { useDispatch } from "react-redux";
import { DispathType } from "../../redux/config";
import { registerApi } from "../../redux/userReducer/userReducer";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationTemplate from "../../templates/AuthenticationTemplate/AuthenticationTemplate";

type Props = {};

type Values = {
  fullname: string;
  email: string;
  password: string;
  image: string;
};

const SignUp = (props: Props) => {
  const dispatch = useDispatch<DispathType>();
  const navigate = useNavigate();
  const initialValues: Values = {
    fullname: "",
    email: "",
    password: "",
    image: "",
  };
  const [togglePassword, setTogglePassword] = useState<Boolean>(true);
  useEffect(() => {
    document.title = "Register Page";

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="authentication wrapper">
      <AuthenticationTemplate>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            fullname: Yup.string().required("Please enter your fullname"),
            email: Yup.string()
              .email("Please enter valid email address")
              .required("Please enter your email address"),
            password: Yup.string()
              .min(8, "Your password must be at least 8 characters or greater")
              .max(15, "Must be 15 characters or less")
              .required("Please enter your password"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dispatch(registerApi(values));
              toast.success("Create user successfully!");
              setSubmitting(false);
              navigate("/");
            }, 500);
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form className="authentication-form">
                <Field>
                  <Label htmlFor="fullname">Fullname</Label>
                  <Input
                    id="fullname"
                    type="text"
                    name="fullname"
                    placeholder="Enter your fullname"
                  />
                </Field>
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
                  Already have an account?{" "}
                  <Link to={"/sign-in"} className="link-signin">
                    Sign in
                  </Link>
                </p>
                <Button
                  type="submit"
                  className="primary"
                  height={56}
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </Form>
            );
          }}
        </Formik>
      </AuthenticationTemplate>
    </div>
  );
};

export default SignUp;

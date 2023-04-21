import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { FormGroup, FormRadio } from "../../components/FormGroup";
import { DashboardHeading } from "../../components/Heading";
import { Field } from "../../components/Field";
import { Radio } from "../../components/Radio";
import slugify from "slugify";
import { useDispatch } from "react-redux";
import { DispathType } from "../../redux/config";
import { toast } from "react-toastify";
import {
  createUserApi,
  userRole,
  userStatus,
} from "../../redux/userReducer/userReducer";

type Props = {};
type Values = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  status: number;
  role: number;
};
export const categoryStatus = {
  APPROVED: 1,
  UNAPPROVED: 2,
};
const CreateUser = (props: Props) => {
  const dispatch = useDispatch<DispathType>();

  const initialValues: Values = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    status: 1,
    role: 1,
  };
  return (
    <div className="create-user">
      <DashboardHeading>Create User</DashboardHeading>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          fullname: Yup.string().required(" "),
          email: Yup.string().required(" ").email(" "),
          password: Yup.string().required(" "),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const newValues = { ...values };
          newValues.username = slugify(values.fullname || values.username, {
            lower: true,
          });
          newValues.status = Number(values.status);
          newValues.role = Number(values.role);
          setTimeout(() => {
            dispatch(
              createUserApi({
                ...newValues,
                createAt: new Date().toLocaleDateString("vi-VI"),
              })
            );
            setSubmitting(false);
            toast.success("Create new user successfully!");
            resetForm();
          }, 500);
        }}
      >
        {({ isSubmitting, values }) => {
          const watchStatus = values.status;
          const watchRole = values.role;

          return (
            <Form>
              <FormGroup>
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
                  <Label htmlFor="username">UserName</Label>
                  <Input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                  />
                </Field>
              </FormGroup>
              <FormGroup>
                <Field>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                  />
                </Field>
                <Field>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="text"
                    name="password"
                    placeholder="Enter your password"
                  />
                </Field>
              </FormGroup>
              <FormGroup>
                <Field>
                  <Label htmlFor="status">Status</Label>
                  <FormRadio>
                    <Radio
                      type="radio"
                      name="status"
                      value={userStatus.ACTIVE}
                      checked={Number(watchStatus) === userStatus.ACTIVE}
                    >
                      Active
                    </Radio>
                    <Radio
                      type="radio"
                      name="status"
                      value={userStatus.PENDING}
                      checked={Number(watchStatus) === userStatus.PENDING}
                    >
                      Pending
                    </Radio>
                    <Radio
                      type="radio"
                      name="status"
                      value={userStatus.BAN}
                      checked={Number(watchStatus) === userStatus.BAN}
                    >
                      Banned
                    </Radio>
                  </FormRadio>
                </Field>
                <Field>
                  <Label htmlFor="role">Role</Label>
                  <FormRadio>
                    <Radio
                      type="radio"
                      name="role"
                      value={userRole.ADMIN}
                      checked={Number(watchRole) === userRole.ADMIN}
                    >
                      Admin
                    </Radio>
                    <Radio
                      type="radio"
                      name="role"
                      value={userRole.MOD}
                      checked={Number(watchRole) === userRole.MOD}
                    >
                      Moderator
                    </Radio>
                    <Radio
                      type="radio"
                      name="role"
                      value={userRole.EDITOR}
                      checked={Number(watchRole) === userRole.EDITOR}
                    >
                      Editor
                    </Radio>
                    <Radio
                      type="radio"
                      name="role"
                      value={userRole.USER}
                      checked={Number(watchRole) === userRole.USER}
                    >
                      User
                    </Radio>
                  </FormRadio>
                </Field>
              </FormGroup>
              <Button
                type="submit"
                className="secondary button-loading"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Add new user
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateUser;

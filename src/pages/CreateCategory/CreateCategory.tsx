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
import { createCategoryApi } from "../../redux/postReducer/postReducer";
import { toast } from "react-toastify";

type Props = {};
type Values = {
  name: string;
  slug: string;
  status: number;
};
export const categoryStatus = {
  APPROVED: 1,
  UNAPPROVED: 2,
};
const CreateCategory = (props: Props) => {
  const dispatch = useDispatch<DispathType>();

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("vi-VI");
  const formattedTime = currentDate.toLocaleTimeString();

  const initialValues: Values = {
    name: "",
    slug: "",
    status: 1,
  };
  return (
    <div className="create-category">
      <DashboardHeading>Create category</DashboardHeading>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required(" "),
          slug: Yup.string().required(" "),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const newValues = { ...values };
          newValues.slug = slugify(values.slug || values.name, { lower: true });
          newValues.status = Number(values.status);
          setTimeout(() => {
            dispatch(
              createCategoryApi({
                ...newValues,
                createAt: formattedTime + " - " + formattedDate,
              })
            );
            setSubmitting(false);
            toast.success("Create new category successfully!");
            resetForm();
          }, 500);
        }}
      >
        {({ isSubmitting, values }) => {
          const watchStatus = values.status;

          return (
            <Form>
              <FormGroup>
                <Field>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your category name"
                  />
                </Field>
                <Field>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    type="text"
                    name="slug"
                    placeholder="Enter your slug"
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
                      value={categoryStatus.APPROVED}
                      checked={Number(watchStatus) === categoryStatus.APPROVED}
                    >
                      Approved
                    </Radio>
                    <Radio
                      type="radio"
                      name="status"
                      value={categoryStatus.UNAPPROVED}
                      checked={
                        Number(watchStatus) === categoryStatus.UNAPPROVED
                      }
                    >
                      Unapproved
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
                Add new category
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateCategory;

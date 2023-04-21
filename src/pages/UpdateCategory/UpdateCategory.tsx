import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { DispathType, RootState } from "../../redux/config";
import { DashboardHeading } from "../../components/Heading";
import { FormGroup, FormRadio } from "../../components/FormGroup";
import { Field } from "../../components/Field";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import { Radio } from "../../components/Radio";
import { categoryStatus } from "../CreateCategory/CreateCategory";
import slugify from "slugify";
import { Button } from "../../components/Button";
import { useSelector } from "react-redux";
import { updateCategoryApi } from "../../redux/postReducer/postReducer";
import { toast } from "react-toastify";

type Props = {};
type Values = {
  name: string;
  slug: string;
  status: number;
};

const UpdateCategory = (props: Props) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const dispatch = useDispatch<DispathType>();
  const { category } = useSelector((state: RootState) => state.postReducer);
  console.log("category", category);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("vi-VI");
  const formattedTime = currentDate.toLocaleTimeString();

  const initialValues: Values = {
    name: category?.name || "",
    slug: category?.slug || "",
    status: category?.status || 1,
  };

  return (
    <div>
      <DashboardHeading title={`Update your category ID: ${categoryId}`}>
        Update category
      </DashboardHeading>
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
              updateCategoryApi(categoryId, {
                ...newValues,
                createAt: formattedTime + " - " + formattedDate,
              })
            );
            setSubmitting(false);
            toast.success("Update category successfully!");
            navigate("/categories");
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
                Update category
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateCategory;

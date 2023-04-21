import React, { useCallback, useState, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { DashboardHeading, Tag } from "../../components/Heading";
import { Field } from "../../components/Field";
import { Label } from "../../components/Label";
import { ImageUpload, Input } from "../../components/Input";
import { useDispatch } from "react-redux";
import { DispathType, RootState } from "../../redux/config";
import { Button, Toggle } from "../../components/Button";
import { FormGroup, FormRadio, FormRow } from "../../components/FormGroup";
import { Radio } from "../../components/Radio";
import { Dropdown, List, Option, Select } from "../../components/Dropdown";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { toast } from "react-toastify";
import {
  CategoryType,
  getCategoriesApi,
  postStatus,
  updatePostApi,
} from "../../redux/postReducer/postReducer";
import { useSelector } from "react-redux";
import slugify from "slugify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EditorText } from "../../components/Editor";

type Props = {};
type Values = {
  title: string;
  slug: string;
  author: string | null | undefined;
  status: number;
  category: CategoryType;
  imageName: string;
  hot: boolean;
  content: string;
  categoryId: string;
};

const UpdatePost = (props: Props) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const postId = params.get("id");

  const dispatch = useDispatch<DispathType>();
  const { categories, post } = useSelector(
    (state: RootState) => state.postReducer
  );
  const { userInfo } = useSelector((state: RootState) => state.userReducer);
  const [image, setImage] = useState<string>(post?.image || "");
  const [progress, setProgress] = useState<number>(0);
  const [categoryTag, setCategoryTag] = useState<string>(
    post?.category?.name || ""
  );
  const initialValues: Values = {
    title: post?.title || "",
    slug: post?.slug || "",
    author: post?.author || "",
    status: post?.status || 0,
    category: post?.category || {},
    imageName: post?.imageName || "",
    hot: post?.hot || false,
    content: post?.content || "",
    categoryId: "",
  };

  useEffect(() => {
    dispatch(getCategoriesApi());
  }, [dispatch]);

  const handleUpdateImg = useCallback((file: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
        }
      },
      (error) => {
        console.log("Error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  }, []);

  const handleDeleteImage = useCallback((imageName: string) => {
    const storage = getStorage();

    const desertRef = ref(storage, "images/" + imageName);

    deleteObject(desertRef)
      .then(() => {
        toast.success("Remove image successfully!");
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        toast.error("Can not delete image!");
      });
  }, []);

  return (
    <div className="create-post">
      <DashboardHeading title={`Update your post ID: ${postId}`}>
        Update post
      </DashboardHeading>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          title: Yup.string().required("Please enter title!"),
          category: Yup.object({
            name: Yup.string().required("Please select a category!"),
          }),
          imageName: Yup.string().required("Please choose a image!"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const cloneValues = { user: userInfo, image, ...values };
          cloneValues.slug = slugify(values.slug || values.title, {
            lower: true,
          });
          cloneValues.status = Number(values.status);
          cloneValues.author = userInfo.name;
          console.log("cloneValues", cloneValues);
          setTimeout(() => {
            dispatch(updatePostApi(postId, { ...cloneValues }));
            setSubmitting(false);
            toast.success("Update post successfully!");
            setImage((prev) => "");
            setProgress((prev) => 0);
            setCategoryTag("");
            resetForm();
            navigate("/post-manage");
          }, 500);
        }}
      >
        {({ isSubmitting, values, setFieldValue, errors }) => {
          const watchStatus = values.status;
          const watchHost = values.hot;
          const handleSelectImg = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              const file = e.target.files[0];
              if (!file) return;
              setFieldValue("imageName", file.name);
              handleUpdateImg(file);
            }
          };

          return (
            <Form>
              <FormGroup>
                <Field>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Enter your title"
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
                  <Label>Image</Label>
                  <ImageUpload
                    trash={!!image}
                    onDeleteImage={() => {
                      handleDeleteImage(values.imageName);
                    }}
                    image={image}
                    name="image"
                    type="file"
                    progress={progress}
                    onChange={handleSelectImg}
                    messError={errors.imageName}
                  />
                </Field>
                <Field>
                  <Label>Category</Label>
                  <Dropdown>
                    <Select
                      placeholder={categoryTag || "Please select a category"}
                    />
                    <List>
                      {categories?.map((category) => {
                        return (
                          <Option
                            key={category.id}
                            onClick={() => {
                              setFieldValue("category", { ...category });
                              setFieldValue("categoryId", category.id);
                              setCategoryTag(category.name || "");
                            }}
                          >
                            {category.name}
                          </Option>
                        );
                      })}
                    </List>
                  </Dropdown>
                  {errors.category?.name && (
                    <span className="error-massage">
                      <i className="fa-solid fa-circle-exclamation"></i>{" "}
                      {errors.category?.name}
                    </span>
                  )}
                  {!!categoryTag && <Tag>{categoryTag}</Tag>}
                </Field>
              </FormGroup>
              <FormRow>
                <Label>Content</Label>
                <EditorText control="tiny-mce" name="content" />
              </FormRow>
              <FormGroup>
                <Field>
                  <Label>Feature post</Label>
                  <Toggle type="checkbox" name="hot" on={watchHost}></Toggle>
                </Field>
                <Field>
                  <Label htmlFor="status">Status</Label>
                  <FormRadio>
                    <Radio
                      type="radio"
                      name="status"
                      value={1}
                      checked={Number(watchStatus) === postStatus.APPROVED}
                    >
                      Approved
                    </Radio>
                    <Radio
                      type="radio"
                      name="status"
                      value={2}
                      checked={Number(watchStatus) === postStatus.PENDING}
                    >
                      Pending
                    </Radio>
                    <Radio
                      type="radio"
                      name="status"
                      value={3}
                      checked={Number(watchStatus) === postStatus.REJECTED}
                    >
                      Reject
                    </Radio>
                  </FormRadio>
                </Field>
              </FormGroup>

              <Button
                type="submit"
                className="secondary button-loading"
                height={56}
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Update
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdatePost;

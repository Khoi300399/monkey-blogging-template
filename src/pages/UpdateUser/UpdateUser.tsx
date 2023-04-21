import React, { useState, useCallback, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Label } from "../../components/Label";
import { ImageUpload, Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { FormGroup, FormRadio } from "../../components/FormGroup";
import { DashboardHeading } from "../../components/Heading";
import { Field } from "../../components/Field";
import { Radio } from "../../components/Radio";
import slugify from "slugify";
import { useDispatch } from "react-redux";
import { DispathType, RootState } from "../../redux/config";
import { toast } from "react-toastify";
import {
  getUsersApi,
  updateUserApi,
  userRole,
  userStatus,
} from "../../redux/userReducer/userReducer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

type Props = {};
type Values = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  imageName: string;
  status: number;
  role: number;
};
export const categoryStatus = {
  APPROVED: 1,
  UNAPPROVED: 2,
};
const UpdateUser = (props: Props) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  console.log("user", user);
  const [image, setImage] = useState<string>(user?.image || "");
  const [progress, setProgress] = useState<number>(0);
  console.log("image", image);
  const dispatch = useDispatch<DispathType>();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const userId = params.get("id");

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
        setProgress(0);
      })
      .catch((error) => {
        toast.error("Can not delete image!");
      });
  }, []);

  const initialValues: Values = {
    fullname: user?.name || "",
    username: slugify(user?.name || "", {
      lower: true,
    }),
    imageName: "",
    email: user?.email || "",
    password: user?.password || "",
    status: user?.status || 1,
    role: user?.role || 1,
  };

  useEffect(() => {
    dispatch(getUsersApi(userId || ""));
  }, [dispatch, userId]);

  return (
    <div className="create-user">
      <DashboardHeading title={`Update user ID: ${userId}`}>
        Create User
      </DashboardHeading>
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
            dispatch(updateUserApi(userId, { ...newValues, image }));
            setSubmitting(false);
            toast.success("Update user successfully!");
            resetForm();
            navigate("/manage/user");
          }, 500);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => {
          const watchStatus = values.status;
          const watchRole = values.role;
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
                  <Label>Avatar</Label>
                  <ImageUpload
                    trash={!!values.imageName}
                    className="round"
                    onDeleteImage={() => {
                      handleDeleteImage(values.imageName);
                    }}
                    image={image}
                    name="image"
                    type="file"
                    progress={progress}
                    onChange={handleSelectImg}
                  />
                </Field>
              </FormGroup>

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
                    type="password"
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
                Update
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateUser;

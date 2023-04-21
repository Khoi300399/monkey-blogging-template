import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryBrowserRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { store } from "./redux/config";
import "./assets/scss/style.scss";

const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const HomeTemplate = lazy(
  () => import("./templates/HomeTempalte/HomeTemplate")
);
const Home = lazy(() => import("./pages/Home/Home"));
const PostDetail = lazy(() => import("./pages/PostDetail/PostDetail"));
const PostManage = lazy(() => import("./layouts/PostManage"));
const CreatePost = lazy(() => import("./pages/CreatePost/CreatePost"));
const UpdatePost = lazy(() => import("./pages/UpdatePost/UpdatePost"));
const CreateUser = lazy(() => import("./pages/CreateUser/CreateUser"));
const Categories = lazy(() => import("./pages/Categories/Categories"));
const UserManage = lazy(() => import("./pages/UserManage/UserManage"));
const CreateCategory = lazy(
  () => import("./pages/CreateCategory/CreateCategory")
);
const UpdateCategory = lazy(
  () => import("./pages/UpdateCategory/UpdateCategory")
);
const UpdateUser = lazy(() => import("./pages/UpdateUser/UpdateUser"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const DashboardTemplate = lazy(
  () => import("./templates/DashboardTeamplate/DashboardTemplate")
);
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const history: any = createBrowserHistory();

root.render(
  <Provider store={store}>
    <HistoryBrowserRouter history={history}>
      <Suspense>
        <Routes>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
          <Route element={<HomeTemplate />}>
            <Route index element={<Home />}></Route>
            <Route path="post-detail" element={<PostDetail />}></Route>
          </Route>
          <Route element={<DashboardTemplate />}>
            <Route path="/post-manage" element={<PostManage />}></Route>
            <Route path="/manage/create-post" element={<CreatePost />}></Route>
            <Route path="/manage/update-post" element={<UpdatePost />}></Route>
            <Route path="/create-category" element={<CreateCategory />}></Route>
            <Route path="/update-category" element={<UpdateCategory />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/categories" element={<Categories />}></Route>
            <Route path="/manage/user" element={<UserManage />}></Route>
            <Route path="/manage/create-user" element={<CreateUser />}></Route>
            <Route path="/manage/update-user" element={<UpdateUser />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
      <ToastContainer></ToastContainer>
    </HistoryBrowserRouter>
  </Provider>
);

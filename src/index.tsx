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
import NotFound from "./pages/NotFound/NotFound";

const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const Home = lazy(() => import("./pages/Home/Home"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const history: any = createBrowserHistory();

root.render(
  <Provider store={store}>
    <HistoryBrowserRouter history={history}>
      <Suspense>
        <Routes>
          <Route path="sign-up" element={<SignUp />}></Route>
          <Route path="sign-in" element={<SignIn />}></Route>
          <Route index element={<Home />}></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
      <ToastContainer></ToastContainer>
    </HistoryBrowserRouter>
  </Provider>
);

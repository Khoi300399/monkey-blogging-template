import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import { getStoreJson, setStoreJson, USER_LOGIN } from "../../util/setting";
import { DispathType } from "../config";
type UserRegisterModel = {
  fullname: string;
  email: string;
  password: string;
};
type UserLoginModel = {
  email: string;
  password: string;
};
type UserInfoType = {
  id: string | undefined | null;
  email: string | undefined | null;
  name: string | undefined | null;
};

type UserState = {
  userInfo: UserInfoType;
};

const initialState: UserState = {
  userInfo: getStoreJson(USER_LOGIN) ? getStoreJson(USER_LOGIN) : null,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserInfo: (state: UserState, action: PayloadAction<UserInfoType>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userReducer.actions;

export default userReducer.reducer;

/*--------------- action async --------------- */

export const registerApi = (userRegister: UserRegisterModel) => {
  const colRef = collection(db, "users");
  return async (dispatch: DispathType) => {
    await createUserWithEmailAndPassword(
      auth,
      userRegister.email,
      userRegister.password
    );
    if (auth.currentUser)
      await updateProfile(auth.currentUser, {
        displayName: userRegister?.fullname,
      });
    addDoc(colRef, {
      name: userRegister.fullname,
      email: userRegister.email,
      password: userRegister.password,
    });
    onAuthStateChanged(auth, (user) => {
      let action: PayloadAction<UserInfoType> = setUserInfo({
        id: user?.uid,
        email: user?.email,
        name: user?.displayName,
      });
      dispatch(action);
      setStoreJson(USER_LOGIN, {
        id: user?.uid,
        email: user?.email,
        name: user?.displayName,
      });
    });
  };
};

export const loginApi = (userLogin: UserLoginModel) => {
  return async (dispatch: DispathType) => {
    await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
  };
};

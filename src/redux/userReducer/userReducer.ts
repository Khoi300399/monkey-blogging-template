import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  query,
  setDoc,
  orderBy,
  getDocs,
  onSnapshot,
  limit,
  deleteDoc,
  getDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import { getStoreJson, setStoreJson, USER_LOGIN } from "../../util/setting";
import { DispathType } from "../config";
import { PAGE_SIZE, setTotalPages } from "../postReducer/postReducer";
import slugify from "slugify";

export type UserRegisterModel = {
  fullname: string;
  email: string;
  password: string;
  username?: string;
  status?: number;
  role?: number;
  createAt?: string;
};
type UserLoginModel = {
  email: string;
  password: string;
};
export type UserInfoType = {
  id: string | undefined | null;
  email: string | undefined | null;
  name: string | undefined | null;
  image: string | undefined | null;
};

export type UserModel = {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
  image?: string;
  createAt?: string;
  role?: number;
  status?: number;
};

type UserState = {
  userInfo: UserInfoType;
  users: UserModel[];
  allUsers: UserModel[];
  user: UserModel | null;
};

export const userStatus = {
  ACTIVE: 1,
  PENDING: 2,
  BAN: 3,
};
export const userRole = {
  ADMIN: 1,
  MOD: 2,
  EDITOR: 3,
  USER: 4,
};

const initialState: UserState = {
  userInfo: getStoreJson(USER_LOGIN) ? getStoreJson(USER_LOGIN) : null,
  users: [],
  allUsers: [],
  user: null,
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setUserInfo: (state: UserState, action: PayloadAction<UserInfoType>) => {
      state.userInfo = action.payload;
    },
    setUsers: (state: UserState, action: PayloadAction<UserModel[]>) => {
      state.users = action.payload;
    },
    setUser: (state: UserState, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    },
    setAllUsers: (state: UserState, action: PayloadAction<UserModel[]>) => {
      state.allUsers = action.payload;
    },
  },
});

export const { setUserInfo, setUsers, setAllUsers, setUser } =
  userReducer.actions;

export default userReducer.reducer;

/*--------------- action async --------------- */

export const registerApi = (userRegister: UserRegisterModel) => {
  return async (dispatch: DispathType) => {
    await createUserWithEmailAndPassword(
      auth,
      userRegister.email,
      userRegister.password
    );
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: userRegister?.fullname,
        photoURL: `https://ui-avatars.com/api/?name=${userRegister?.fullname}`,
      });
      await setDoc(doc(db, "users", auth?.currentUser?.uid), {
        name: userRegister.fullname,
        email: userRegister.email,
        username: slugify(userRegister.fullname, {
          lower: true,
        }),
        password: userRegister.password,
        image: `https://ui-avatars.com/api/?name=${userRegister?.fullname}`,
        role: userRole.USER,
        status: userStatus.ACTIVE,
        createAt: new Date().toDateString(),
      });
    }

    onAuthStateChanged(auth, (user) => {
      let action: PayloadAction<UserInfoType> = setUserInfo({
        id: user?.uid,
        email: user?.email,
        name: user?.displayName,
        image: user?.photoURL,
      });
      dispatch(action);
      setStoreJson(USER_LOGIN, {
        id: user?.uid,
        email: user?.email,
        name: user?.displayName,
        image: user?.photoURL,
      });
    });
  };
};

export const loginApi = (userLogin: UserLoginModel) => {
  return async (dispatch: DispathType) => {
    await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);

    onAuthStateChanged(auth, (user) => {
      let action: PayloadAction<UserInfoType> = setUserInfo({
        id: user?.uid,
        email: user?.email,
        name: user?.displayName,
        image: user?.photoURL,
      });
      dispatch(action);
      setStoreJson(USER_LOGIN, {
        id: user?.uid,
        email: user?.email,
        name: user?.displayName,
        image: user?.photoURL,
      });
    });
  };
};

export const createUserApi = (userRegister: UserRegisterModel) => {
  return async (dispatch: DispathType) => {
    await createUserWithEmailAndPassword(
      auth,
      userRegister.email,
      userRegister.password
    );
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: userRegister?.fullname,
        photoURL: `https://ui-avatars.com/api/?name=${userRegister.fullname}`,
      });
      await setDoc(doc(db, "users", auth?.currentUser?.uid), {
        name: userRegister.fullname,
        email: userRegister.email,
        username: userRegister.username,
        password: userRegister.password,
        image: `https://ui-avatars.com/api/?name=${userRegister.fullname}`,
        role: userRegister.role,
        status: userRegister.status,
        createAt: new Date().toDateString(),
      });
    }
  };
};

export const deleteUserApi = (id: string) => {
  return async (dispatch: DispathType) => {
    const docRef = doc(db, "users", id);
    await deleteDoc(docRef);
  };
};

export const updateUserApi = (id: string | null, data: UserModel) => {
  return async (dispatch: DispathType) => {
    if (id) {
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, { ...data });
    }
  };
};

export const updateProfileApi = (id: string | null, data: UserModel) => {
  return async (dispatch: DispathType) => {
    if (auth.currentUser && id) {
      await updateProfile(auth.currentUser, {
        displayName: data?.name,
        photoURL: data?.image,
      });
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, { ...data });
    }
  };
};

export const getUsersApi = (id?: string) => {
  if (!id) {
    return async (dispatch: DispathType) => {
      const colRef = collection(db, "users");
      const q = query(colRef, orderBy("name"));
      const totalSnapshot = await getDocs(q);
      const totalPages = Math.ceil(totalSnapshot.size / PAGE_SIZE);
      dispatch(setTotalPages(totalPages));
      onSnapshot(q, (snapshot) => {
        const result: UserModel[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log("result", result);
        dispatch(setAllUsers(result));
      });
      const queryRef = query(colRef, orderBy("name"), limit(PAGE_SIZE));
      onSnapshot(queryRef, (snapshot) => {
        const result: UserModel[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(setUsers(result));
      });
    };
  } else {
    return async (dispatch: DispathType) => {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const result: UserModel = { ...docSnap.data() };
        dispatch(setUser(result));
      }
    };
  }
};

export const searchUserApi = (keyword: string) => {
  return async (dispatch: DispathType) => {
    const colRef = collection(db, "users");
    const queries = query(
      colRef,
      where("name", ">=", keyword),
      where("name", "<=", `${keyword}\uf8ff`),
      orderBy("name"),
      limit(PAGE_SIZE)
    );
    onSnapshot(queries, (snapshot) => {
      const result: UserModel[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(setUsers(result));
    });
  };
};

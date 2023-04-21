import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DispathType } from "../config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { UserInfoType } from "../userReducer/userReducer";

export const PAGE_SIZE = 5;

export type CategoryModel = {
  name?: string;
  status?: number;
  slug?: string;
  id: string;
};

export type PostType = {
  id?: string;
  title?: string;
  slug?: string;
  author?: string | undefined | null;
  status?: number;
  category?: CategoryType;
  imageName?: string;
  hot?: boolean;
  user?: UserInfoType | undefined | null;
  image?: string;
  createAt?: string;
  content?: string;
  categoryId?: string;
  userId?: string;
};
export type CategoryType = {
  name?: string;
  slug?: string;
  status?: number;
  createAt?: string;
};

type PostState = {
  categories: CategoryModel[];
  allCategory: CategoryModel[];
  posts: PostType[];
  post: PostType | null;
  allPosts: PostType[];
  category: CategoryType | null;
  postFeature: PostType[];
  postRelate: PostType[];
  currentPage: number;
  totalPages: number;
  lastDoc: string | null;
};

export const postStatus = {
  APPROVED: 1,
  PENDING: 2,
  REJECTED: 3,
};

const initialState: PostState = {
  categories: [],
  allCategory: [],
  posts: [],
  allPosts: [],
  category: null,
  post: null,
  postFeature: [],
  postRelate: [],
  currentPage: 1,
  totalPages: 0,
  lastDoc: null,
};

const postReducer = createSlice({
  name: "postReducer",
  initialState,
  reducers: {
    setCategories: (
      state: PostState,
      action: PayloadAction<CategoryModel[]>
    ) => {
      state.categories = action.payload;
    },
    setAllCategory: (
      state: PostState,
      action: PayloadAction<CategoryModel[]>
    ) => {
      state.allCategory = action.payload;
    },
    setPosts: (state: PostState, action: PayloadAction<PostType[]>) => {
      state.posts = action.payload;
    },
    setPost: (state: PostState, action: PayloadAction<PostType>) => {
      state.post = action.payload;
    },
    setAllPosts: (state: PostState, action: PayloadAction<PostType[]>) => {
      state.allPosts = action.payload;
    },
    setCategory: (state: PostState, action: PayloadAction<CategoryType>) => {
      state.category = action.payload;
    },
    setPostFeature: (state: PostState, action: PayloadAction<PostType[]>) => {
      state.postFeature = action.payload;
    },
    setPostRelate: (state: PostState, action: PayloadAction<PostType[]>) => {
      state.postRelate = action.payload;
    },
    setCurrentPage: (state: PostState, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state: PostState, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setLastDoc: (state: PostState, action: PayloadAction<string | null>) => {
      state.lastDoc = action.payload;
    },
  },
});

export const {
  setCategories,
  setAllCategory,
  setCategory,
  setPostFeature,
  setCurrentPage,
  setTotalPages,
  setLastDoc,
  setAllPosts,
  setPosts,
  setPost,
  setPostRelate,
} = postReducer.actions;

export default postReducer.reducer;

/*--------------- action async --------------- */
export const getCategoriesApi = (id?: string | null) => {
  if (!id) {
    return async (dispatch: DispathType) => {
      const colRef = collection(db, "categories");
      const q = query(colRef, orderBy("name"));
      const totalSnapshot = await getDocs(q);
      const totalPages = Math.ceil(totalSnapshot.size / PAGE_SIZE);
      dispatch(setTotalPages(totalPages));
      onSnapshot(q, (snapshot) => {
        const result: CategoryModel[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(setAllCategory(result));
      });
      const queryRef = query(colRef, orderBy("name"), limit(PAGE_SIZE));
      onSnapshot(queryRef, (snapshot) => {
        const result: CategoryModel[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(setCategories(result));
      });
    };
  } else {
    return async (dispatch: DispathType) => {
      const docRef = doc(db, "categories", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const result: CategoryType = { ...docSnap.data() };
        dispatch(setCategory(result));
      }
    };
  }
};
export const getPostsApi = (id?: string | null) => {
  if (!id) {
    return async (dispatch: DispathType) => {
      const colRef = collection(db, "posts");
      const q = query(colRef, orderBy("title"));
      const totalSnapshot = await getDocs(q);
      const totalPages = Math.ceil(totalSnapshot.size / PAGE_SIZE);
      dispatch(setTotalPages(totalPages));
      onSnapshot(q, (snapshot) => {
        const result: PostType[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(setAllPosts(result));
      });
      const queryRef = query(colRef, orderBy("title"), limit(PAGE_SIZE));
      onSnapshot(queryRef, (snapshot) => {
        const result: PostType[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(setPosts(result));
      });
    };
  } else {
    return async (dispatch: DispathType) => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const result: PostType = { ...docSnap.data() };
        dispatch(setPost(result));
      }
    };
  }
};

export const deletepostApi = (id: string) => {
  return async (dispatch: DispathType) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };
};

export const searchPostApi = (keyword: string) => {
  return async (dispatch: DispathType) => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("title", ">=", keyword),
      where("title", "<=", `${keyword}\uf8ff`),
      orderBy("title"),
      limit(PAGE_SIZE)
    );
    onSnapshot(queries, (snapshot) => {
      const result: PostType[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(setPosts(result));
    });
  };
};

export const updatePostApi = (id: string | null, data: PostType) => {
  return async (dispatch: DispathType) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, { ...data });
    }
  };
};

export const searchCategoryApi = (keyword: string) => {
  return async (dispatch: DispathType) => {
    const colRef = collection(db, "categories");
    const queries = query(
      colRef,
      where("name", ">=", keyword),
      where("name", "<=", `${keyword}\uf8ff`),
      orderBy("name"),
      limit(PAGE_SIZE)
    );
    onSnapshot(queries, (snapshot) => {
      const result: CategoryModel[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(setCategories(result));
    });
  };
};

export const deleteCategoryApi = (id: string) => {
  return async (dispatch: DispathType) => {
    const docRef = doc(db, "categories", id);
    await deleteDoc(docRef);
  };
};

export const updateCategoryApi = (id: string | null, data: CategoryType) => {
  return async (dispatch: DispathType) => {
    if (id) {
      const docRef = doc(db, "categories", id);
      await updateDoc(docRef, { ...data });
    }
  };
};

export const getPostFeatureApi = () => {
  return async (dispatch: DispathType) => {
    const colRef = collection(db, "posts");
    const queries = query(colRef, where("hot", "==", true), limit(3));
    const snapshot = await getDocs(queries);
    const result: PostType[] = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    dispatch(setPostFeature(result));
  };
};
export const getPostRelateApi = (id: string) => {
  return async (dispatch: DispathType) => {
    const colRef = collection(db, "posts");
    const queries = query(colRef, where("categoryId", "==", id), limit(3));
    const snapshot = await getDocs(queries);
    const result: PostType[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch(setPostRelate(result));
  };
};

export const createPostApi = (post: PostType) => {
  return async (dispatch: DispathType) => {
    const colRef = collection(db, "posts");
    await addDoc(colRef, post);
  };
};

export const createCategoryApi = (category: CategoryType) => {
  return async (dispatch: DispathType) => {
    const colRef = collection(db, "categories");
    await addDoc(colRef, category);
  };
};

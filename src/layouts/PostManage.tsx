import { useState, useEffect } from "react";
import { DashboardHeading } from "../components/Heading";
import { Pagination } from "../components/Pagination";
import { Table } from "../components/Table";
import { Delete, Edit, View } from "../components/Actions";
import { Search } from "../components/Dropdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DispathType, RootState } from "../redux/config";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  PAGE_SIZE,
  PostType,
  deletepostApi,
  getPostsApi,
  postStatus,
  searchPostApi,
  setCurrentPage,
  setPosts,
} from "../redux/postReducer/postReducer";
import { debounce } from "lodash";
import {
  collection,
  limit,
  query,
  orderBy,
  startAfter,
  getDocs,
  endBefore,
  limitToLast,
  startAt,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { LabelTable } from "../components/Label";

type Props = {};

const PostManage = (props: Props) => {
  const dispatch = useDispatch<DispathType>();
  const navigate = useNavigate();
  const { posts, currentPage, allPosts } = useSelector(
    (state: RootState) => state.postReducer
  );
  const [lastDoc, setLastDoc] = useState<string | null | undefined>(null);
  const [firstDoc, setFirstDoc] = useState<string | null | undefined>(null);

  const handleDeleteCategory = (id: string | undefined) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed && id) {
        dispatch(deletepostApi(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleInputFilter = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(searchPostApi(e.target.value));
    },
    500
  );
  useEffect(() => {
    dispatch(getPostsApi());
  }, [dispatch]);

  useEffect(() => {
    if (allPosts && allPosts.length > 0) {
      setLastDoc(allPosts[PAGE_SIZE * currentPage - 1]?.title);
      setFirstDoc(allPosts[PAGE_SIZE * (currentPage - 1)]?.title);
    }
  }, [allPosts, currentPage]);

  const handleNextPage = async () => {
    const colRef = collection(db, "categories");

    let queryRef = query(colRef, orderBy("title"), limit(PAGE_SIZE));

    if (posts.length > 0) {
      queryRef = query(
        colRef,
        orderBy("name"),
        limit(PAGE_SIZE),
        startAfter(lastDoc)
      );
    }
    const querySnapshot = await getDocs(queryRef);
    const result: PostType[] = querySnapshot.docs.map((doc) => {
      const data = doc && doc.data ? doc.data() : {};
      return {
        ...data,
        id: doc.id,
      };
    });
    dispatch(setPosts(result));
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevPage = async () => {
    const colRef = collection(db, "categories");

    const queryRef = query(
      colRef,
      orderBy("name"),
      endBefore(firstDoc),
      limitToLast(PAGE_SIZE)
    );
    const querySnapshot = await getDocs(queryRef);
    const result: PostType[] = querySnapshot.docs.map((doc) => {
      const data = doc && doc.data ? doc.data() : {};
      return {
        ...data,
        id: doc.id,
      };
    });
    dispatch(setPosts(result));
    dispatch(setCurrentPage(currentPage - 1));
  };

  const handlePageClick = async (event: React.MouseEvent<HTMLElement>) => {
    const pageNum = Number(event.currentTarget.innerHTML);
    console.log("pageNum", pageNum);
    const colRef = collection(db, "categories");
    let queryRef = query(colRef, orderBy("name"), limit(PAGE_SIZE));
    if (posts.length > 0) {
      queryRef = query(
        colRef,
        orderBy("name"),
        limit(PAGE_SIZE),
        startAt(allPosts[PAGE_SIZE * (pageNum - 1)]?.title)
      );
      console.log(" allCategory[0]?.name", allPosts[0]?.title);
    }
    const querySnapshot = await getDocs(queryRef);
    const result: PostType[] = querySnapshot.docs.map((doc) => {
      const data = doc && doc.data ? doc.data() : {};
      return {
        ...data,
        id: doc.id,
      };
    });
    dispatch(setPosts(result));
    dispatch(setCurrentPage(pageNum));
  };
  return (
    <div className="postManage">
      <DashboardHeading>Manage post</DashboardHeading>
      <Search
        placeholder="Search post..."
        onChange={handleInputFilter}
      ></Search>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(
            ({ id, title, createAt, category, author, image, status }) => {
              const renderLabelStatus = (status: number) => {
                switch (status) {
                  case postStatus.APPROVED:
                    return (
                      <LabelTable className="success">Approved</LabelTable>
                    );
                  case postStatus.PENDING:
                    return <LabelTable className="warning">Pending</LabelTable>;
                  case postStatus.REJECTED:
                    return <LabelTable className="danger">Rejected</LabelTable>;
                }
              };
              return (
                <tr key={id}>
                  <td title={id}>{id?.slice(0, 5) + " ..."}</td>
                  <td>
                    <div className="table-img">
                      <img src={image} alt="" />
                      <div className="table-img-content">
                        <h3 className="font-semibold">{title}</h3>
                        <time className="text-sm text-gray-500">
                          {createAt}
                        </time>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-500">{category?.name}</span>
                  </td>
                  <td>
                    <span className="text-gray-500">{author}</span>
                  </td>
                  <td>{renderLabelStatus(status || 0)}</td>
                  <td>
                    <div className="table-action">
                      <View
                        onClick={async () => {
                          await dispatch(getPostsApi(id));
                          navigate(`/post-detail?id=${id}`);
                        }}
                      />
                      <Edit
                        onClick={async () => {
                          await dispatch(getPostsApi(id));
                          navigate(`/manage/update-post?id=${id}`);
                        }}
                      />
                      <Delete
                        onClick={() => {
                          handleDeleteCategory(id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </Table>
      <div>
        <Pagination
          handlePageClick={handlePageClick}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        ></Pagination>
      </div>
    </div>
  );
};

export default PostManage;

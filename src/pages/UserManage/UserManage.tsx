import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import Swal from "sweetalert2";
import { DashboardHeading } from "../../components/Heading";
import { Button } from "../../components/Button";
import { Table } from "../../components/Table";
import { LabelTable } from "../../components/Label";
import { Delete, Edit } from "../../components/Actions";
import { useDispatch } from "react-redux";
import { DispathType, RootState } from "../../redux/config";
import { useSelector } from "react-redux";
import {
  CategoryModel,
  PAGE_SIZE,
  setCategories,
  setCurrentPage,
} from "../../redux/postReducer/postReducer";
import { useNavigate } from "react-router-dom";
import { Search } from "../../components/Dropdown";
import { Pagination } from "../../components/Pagination";
import {
  collection,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  startAt,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import {
  UserModel,
  deleteUserApi,
  getUsersApi,
  searchUserApi,
  setUsers,
  userRole,
  userStatus,
} from "../../redux/userReducer/userReducer";

type Props = {};

const UserManage = (props: Props) => {
  const dispatch = useDispatch<DispathType>();
  const navigate = useNavigate();
  const { currentPage } = useSelector((state: RootState) => state.postReducer);
  const { allUsers, users } = useSelector(
    (state: RootState) => state.userReducer
  );
  console.log("allUsers", allUsers);
  console.log("users", users);
  const [lastDoc, setLastDoc] = useState<string | null | undefined>(null);
  const [firstDoc, setFirstDoc] = useState<string | null | undefined>(null);

  const handleDeleteUser = (id: string | undefined) => {
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
        dispatch(deleteUserApi(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleInputFilter = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(searchUserApi(e.target.value));
    },
    500
  );
  useEffect(() => {
    dispatch(getUsersApi());
  }, [dispatch]);

  useEffect(() => {
    if (allUsers && allUsers.length > 0) {
      setLastDoc(allUsers[PAGE_SIZE * currentPage - 1]?.name);
      setFirstDoc(allUsers[PAGE_SIZE * (currentPage - 1)]?.name);
    }
  }, [allUsers, currentPage]);

  const handleNextPage = async () => {
    const colRef = collection(db, "users");

    let queryRef = query(colRef, orderBy("name"), limit(PAGE_SIZE));

    if (users.length > 0) {
      queryRef = query(
        colRef,
        orderBy("name"),
        limit(PAGE_SIZE),
        startAfter(lastDoc)
      );
    }
    const querySnapshot = await getDocs(queryRef);
    const result: UserModel[] = querySnapshot.docs.map((doc) => {
      const data = doc && doc.data ? doc.data() : {};
      return {
        ...data,
        id: doc.id,
      };
    });
    dispatch(setUsers(result));
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handlePrevPage = async () => {
    const colRef = collection(db, "users");

    const queryRef = query(
      colRef,
      orderBy("name"),
      endBefore(firstDoc),
      limitToLast(PAGE_SIZE)
    );
    const querySnapshot = await getDocs(queryRef);
    const result: UserModel[] = querySnapshot.docs.map((doc) => {
      const data = doc && doc.data ? doc.data() : {};
      return {
        ...data,
        id: doc.id,
      };
    });
    dispatch(setUsers(result));
    dispatch(setCurrentPage(currentPage - 1));
  };

  const handlePageClick = async (event: React.MouseEvent<HTMLElement>) => {
    const pageNum = Number(event.currentTarget.innerHTML);
    console.log("pageNum", pageNum);
    const colRef = collection(db, "categories");
    let queryRef = query(colRef, orderBy("name"), limit(PAGE_SIZE));
    if (users.length > 0) {
      queryRef = query(
        colRef,
        orderBy("name"),
        limit(PAGE_SIZE),
        startAt(allUsers[PAGE_SIZE * (pageNum - 1)]?.name)
      );
      console.log(" allCategory[0]?.name", allUsers[0]?.name);
    }
    const querySnapshot = await getDocs(queryRef);
    const result: CategoryModel[] = querySnapshot.docs.map((doc) => {
      const data = doc && doc.data ? doc.data() : {};
      return {
        ...data,
        id: doc.id,
      };
    });
    dispatch(setCategories(result));
    dispatch(setCurrentPage(pageNum));
  };

  return (
    <div className="userManage">
      <div className="postManage-heading">
        <DashboardHeading>User Manage</DashboardHeading>
        <Button href="/manage/create-user" className="create">
          Create user
        </Button>
      </div>
      <Search
        onChange={handleInputFilter}
        placeholder="Search user ..."
      ></Search>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ email, name, id, image, role, status, createAt }) => {
            const renderLabelStatus = (status: number) => {
              switch (status) {
                case userStatus.ACTIVE:
                  return <LabelTable className="success">Active</LabelTable>;
                case userStatus.PENDING:
                  return <LabelTable className="warning">Pending</LabelTable>;
                case userStatus.BAN:
                  return <LabelTable className="danger">Banned</LabelTable>;
              }
            };
            const renderRole = (role: number) => {
              switch (role) {
                case userRole.ADMIN:
                  return "Admin";
                case userRole.MOD:
                  return "Mod";
                case userRole.EDITOR:
                  return "Editor";
                case userRole.USER:
                  return "User";
              }
            };
            return (
              <tr key={id}>
                <td title={id}>{id?.slice(0, 5) + " ..."}</td>
                <td>
                  <div className="table-img">
                    <img src={image} alt="avatar" />
                    <div className="table-img-content">
                      <h3 className="font-semibold">{name}</h3>
                      <time className="text-sm text-gray-500">
                        {new Date(createAt || "").toLocaleDateString("vi-VI")}
                      </time>
                    </div>
                  </div>
                </td>
                <td title={email}>{email}</td>
                <td>{renderLabelStatus(status || 0)}</td>
                <td>{renderRole(role || 0)}</td>
                <td>
                  <div className="table-action">
                    <Edit
                      onClick={async () => {
                        await dispatch(getUsersApi(id));
                        navigate(`/manage/update-user?id=${id}`);
                      }}
                    />
                    <Delete
                      onClick={() => {
                        handleDeleteUser(id);
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
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

export default UserManage;

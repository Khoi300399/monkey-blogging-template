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
  deleteCategoryApi,
  getCategoriesApi,
  searchCategoryApi,
  setCategories,
  setCurrentPage,
} from "../../redux/postReducer/postReducer";
import { categoryStatus } from "../CreateCategory/CreateCategory";
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

type Props = {};

const Categories = (props: Props) => {
  const dispatch = useDispatch<DispathType>();
  const navigate = useNavigate();
  const { categories, currentPage, allCategory } = useSelector(
    (state: RootState) => state.postReducer
  );
  console.log("allCategory", allCategory);
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
        dispatch(deleteCategoryApi(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleInputFilter = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(searchCategoryApi(e.target.value));
    },
    500
  );
  useEffect(() => {
    dispatch(getCategoriesApi());
  }, [dispatch]);

  useEffect(() => {
    if (allCategory && allCategory.length > 0) {
      setLastDoc(allCategory[PAGE_SIZE * currentPage - 1]?.name);
      setFirstDoc(allCategory[PAGE_SIZE * (currentPage - 1)]?.name);
    }
  }, [allCategory, currentPage]);

  const handleNextPage = async () => {
    const colRef = collection(db, "categories");

    let queryRef = query(colRef, orderBy("name"), limit(PAGE_SIZE));

    if (categories.length > 0) {
      queryRef = query(
        colRef,
        orderBy("name"),
        limit(PAGE_SIZE),
        startAfter(lastDoc)
      );
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
    const result: CategoryModel[] = querySnapshot.docs.map((doc) => {
      const data = doc && doc.data ? doc.data() : {};
      return {
        ...data,
        id: doc.id,
      };
    });
    dispatch(setCategories(result));
    dispatch(setCurrentPage(currentPage - 1));
  };

  const handlePageClick = async (event: React.MouseEvent<HTMLElement>) => {
    const pageNum = Number(event.currentTarget.innerHTML);
    console.log("pageNum", pageNum);
    const colRef = collection(db, "categories");
    let queryRef = query(colRef, orderBy("name"), limit(PAGE_SIZE));
    if (categories.length > 0) {
      queryRef = query(
        colRef,
        orderBy("name"),
        limit(PAGE_SIZE),
        startAt(allCategory[PAGE_SIZE * (pageNum - 1)]?.name)
      );
      console.log(" allCategory[0]?.name", allCategory[0]?.name);
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
    <div className="categories">
      <div className="categories-heading">
        <DashboardHeading>Categories</DashboardHeading>
        <Button href="/create-category" className="create">
          Create category
        </Button>
      </div>
      <Search
        onChange={handleInputFilter}
        placeholder="Search category ..."
      ></Search>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(({ id, name, slug, status }) => {
            return (
              <tr key={id}>
                <td title={id}>{id.slice(0, 5) + " ..."}</td>
                <td>{name}</td>
                <td>
                  <LabelTable className="link">{slug}</LabelTable>
                </td>
                <td>
                  <LabelTable
                    className={
                      status === categoryStatus.APPROVED ? "success" : "danger"
                    }
                  >
                    {status === categoryStatus.APPROVED
                      ? "Approved"
                      : "Unapproved"}
                  </LabelTable>
                </td>
                <td>
                  <div className="table-action">
                    <Edit
                      onClick={async () => {
                        await dispatch(getCategoriesApi(id));
                        navigate(`/update-category?id=${id}`);
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

export default Categories;

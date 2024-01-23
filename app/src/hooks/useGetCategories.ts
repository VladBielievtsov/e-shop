import { getAllCategories } from "@/lib/features/category/categoryActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useEffect } from "react";

function useGetCategories() {
  const dispatch = useAppDispatch();

  const categoriesStatus = useAppSelector(
    (state: RootState) => state.categories.status
  );

  let { categories } = useAppSelector((state: RootState) => state);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(getAllCategories());
    }
  }, [categoriesStatus, dispatch]);

  return categories.categories;
}

export { useGetCategories };

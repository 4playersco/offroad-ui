import { FC } from "react";
import cn from "classnames";

import Styles from "./pagination.module.scss";

import Button from "../Button";

interface PaginationProps {
  page: number;
  totalRecords: number;
}

const Pagination: FC<PaginationProps> = ({ page, totalRecords }) => {
  const numberOfPages = Math.ceil(totalRecords / 20);
  const hasMoreThanOnePage = numberOfPages > 1;

  const prevClass = cn([
    Styles["pagination-btn"],
    Styles["pagination-btn--previous"],
  ]);
  const nextClass = cn([
    Styles["pagination-btn"],
    Styles["pagination-btn--next"],
  ]);

  return (
    <div className={Styles["pagination"]}>
      {hasMoreThanOnePage && (
        <ul className={Styles["pagination-list"]}>
          <li className={prevClass}>
            <Button
              disabled={page <= 1}
              to={page === 2 || page === 1 ? `?` : `?page=${page - 1}`}
            >
              &lt;
            </Button>
          </li>
          <li className={Styles["pagination-btn"]}>Page {page}</li>
          <li className={nextClass}>
            <Button disabled={page >= numberOfPages} to={`?page=${page + 1}`}>
              &gt;
            </Button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Pagination;

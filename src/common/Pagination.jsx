import React from "react";
import _ from "underscore";
import PropTypes from "prop-types";

function Pagination(props) {
  const { totalItems, pageSize, onPageChange, currentPage } = props;

  const totalPage = totalItems / pageSize;

  if (totalPage <= 1) return null;

  const pages = _.range(1, totalPage + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((p) => {
          return (
            <li
              key={p}
              className={currentPage === p ? "page-item active" : "page-item"}
              onClick={() => onPageChange(p)}
            >
              <p className="page-link" style={{ cursor: "default" }}>
                {p}
              </p>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;

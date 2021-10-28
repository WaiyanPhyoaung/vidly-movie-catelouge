import React from "react";

function TableHeader(props) {
  const { sortColumn, handleSort, column } = props;

  const onSort = (type) => {
    const sortingColumn = { ...sortColumn };
    if (type === sortingColumn.type)
      sortingColumn.order = sortingColumn.order === "asc" ? "desc" : "asc";
    else {
      sortingColumn.type = type;
      sortingColumn.order = "asc";
    }
    handleSort(sortingColumn);
  };

  const renderIcon = (column) => {
    if (sortColumn.type !== column.type) return null;
    if (sortColumn.order === "asc")
      return <i className="bi bi-sort-up ms-1"></i>;
    else return <i className="bi bi-sort-down ms-1"></i>;
  };

  return (
    <thead>
      <tr>
        {column.map((c, index) => (
          <th
            key={index}
            className="clickable col-3"
            onClick={() => onSort(c.type)}
          >
            {c.title}
            {renderIcon(c)}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;

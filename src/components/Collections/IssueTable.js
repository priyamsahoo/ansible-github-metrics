import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import { COLUMNS } from "./IssueColumns";
import { Filter, DefaultColumnFilter } from "../../utils/filters";
import { Button } from "bootstrap";

const IssueTable = ({ issues }) => {
  // const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => issues, []);

  const columns = COLUMNS;
  const data = issues;

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    prepareRow,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  //
  //

  return (
    <div className="issue-list">
      <h3>Issues: {rows.length}</h3>
      <Table
        bordered
        hover
        className="issue-table"
        {...getTableProps()}
        width={1300}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          ></input>
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default IssueTable;

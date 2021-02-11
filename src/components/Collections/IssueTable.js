import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import { COLUMNS } from "./IssueColumns";
import { Filter, DefaultColumnFilter } from "../../utils/filters";
// import { Button } from "bootstrap";
import { Empty, Input, Select } from "antd";
import { Button } from "antd";

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

  const { Option } = Select;

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
        width={1450}
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
          {rows.length == 0 ? (
            <td colSpan="5">
              <Empty />
            </td>
          ) : (
            <>
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
            </>
          )}
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
          <Input
            min="1"
            size="small"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          ></Input>{" "}
        </span>
        <Select
          size="small"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e))}
        >
          {[10, 25, 50].map((pageSize) => (
            <Option key={pageSize} value={pageSize}>
              Show {pageSize}
            </Option>
          ))}
        </Select>
        {" | "}
        <Button
          size="small"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </Button>{" "}
        <Button
          size="small"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>{" "}
        <Button size="small" onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>{" "}
        <Button
          size="small"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </Button>
      </div>
    </div>
  );
};

export default IssueTable;

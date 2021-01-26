import "./cell.css";
import { DateFilter, SelectColumnFilter } from "./filters";
import moment from "moment";
import { CenteredHeader } from "./CenteredHeader";

export const COLUMNS = [
  {
    Header: <CenteredHeader name="Created At" />,
    Footer: "Created At",
    accessor: "node.createdAt",
    Cell: ({ value }) => {
      return moment(new Date(value)).format("ll");
    },
    disableSortBy: true,
    Filter: DateFilter,
    filter: (rows, columnId, filterValues) => {
      return filterValues;
    },
    maxWidth: 100,
  },
  // {
  //     id: 'node.closed',
  //     Header: 'Status',
  //     Footer: 'Status',
  //     accessor: d => { return d.node.closed ? "Closed" : "Open" },
  //     Filter: SelectColumnFilter,
  //     filter: 'equals'
  // },
  {
    Header: <CenteredHeader name="Status" />,
    Footer: "Status",
    accessor: "node.state",
    Filter: SelectColumnFilter,
    filter: "equals",
    disableSortBy: true,
    maxWidth: 100,
  },
  {
    Header: <CenteredHeader name="Title" />,
    Footer: "Title",
    accessor: "node.title",
    Cell: ({ cell: { value }, row: { original } }) => (
      <a href={original.node.url} target="_blank">
        {value}
      </a>
    ),
    disableSortBy: true,
    maxWidth: 250,
  },
  {
    Header: <CenteredHeader name="Updated At" />,
    Footer: "Updated At",
    accessor: "node.updatedAt",
    Cell: ({ value }) => {
      return moment(new Date(value)).format("ll");
    },
    disableFilters: true,
    maxWidth: 100,
  },
  {
    Header: <CenteredHeader name="Author" />,
    Footer: "Author",
    accessor: "node.author.login",
    disableFilters: true,
    maxWidth: 100,
  },
];

import { format } from "date-fns";
import { CustomInput } from "reactstrap";
import { DateFilter, SelectColumnFilter } from "../../utils/filters";
import moment from "moment";
// import { CenteredHeader } from "./CenteredHeader";

export const COLUMNS = [
  {
    // Header: <CenteredHeader name="Created At" />,
    Header: "Created At",
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
    // Header: <CenteredHeader name="Status" />,
    Header: "Status",
    Footer: "Status",
    accessor: "node.state",
    Filter: SelectColumnFilter,
    filter: "equals",
    disableSortBy: true,
    maxWidth: 100,
  },
  {
    // Header: <CenteredHeader name="Title" />,
    Header: "Title",
    // Header: { row.length },
    Footer: "Title",
    accessor: "node.title",
    Cell: ({ cell: { value }, row: { original } }) => (
      <a href={original.node.url} target="_blank">
        {value}
      </a>
    ),
    disableSortBy: true,
    minWidth: 250,
  },
  {
    // Header: <CenteredHeader name="Updated At" />,
    Header: "Updated At",
    Footer: "Updated At",
    accessor: "node.updatedAt",
    Cell: ({ value }) => {
      return moment(new Date(value)).format("ll");
    },
    disableFilters: true,
    maxWidth: 100,
  },
  {
    // Header: <CenteredHeader name="Author" />,
    Header: "Author",
    Footer: "Author",
    accessor: "node.author.login",
    disableFilters: true,
    maxWidth: 100,
  },
];

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Table } from 'reactstrap';
import { useTable, useFilters, useSortBy } from 'react-table';
import { COLUMNS } from './IssueColumns';
import { Filter, DefaultColumnFilter } from './filters';


const IssueTable = ({ name, issues, count }) => {

    // const columns = useMemo(() => COLUMNS, []);
    // const data = useMemo(() => issues, []);

    const columns = COLUMNS;
    const data = issues;

    const tableInstance = useTable({
        columns,
        data,
        defaultColumn: { Filter: DefaultColumnFilter },
        },
        useFilters,
        useSortBy,);

    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = tableInstance;

    const generateSortingIndicator = (column) => {
        return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
    };

    // const [count, setCount] = useState(issues.length);

    return (
        <div className="issue-list">
            <h2>Repository: { name }</h2>
            <h2>Issues: { count }</h2>

            <Table bordered hover className="issue-table" { ...getTableProps() }>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr { ...headerGroup.getHeaderGroupProps() }>
                                {
                                    headerGroup.headers.map((column) => (
                                        <th { ...column.getHeaderProps(column.getSortByToggleProps()) }>
                                            {
                                                column.render('Header')
                                            }
                                            <span>
                                                { generateSortingIndicator(column) }
                                            </span>
                                            <Filter column={column} />
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody { ...getTableBodyProps() }>
                    {
                        rows.map((row) => {
                            prepareRow(row)
                            return (
                                <tr { ...row.getRowProps() }>
                                    {
                                        row.cells.map((cell) => {
                                            return (
                                                <td { ...cell.getCellProps() }>
                                                    {
                                                        cell.render('Cell')
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>

    )
}
 
export default IssueTable;
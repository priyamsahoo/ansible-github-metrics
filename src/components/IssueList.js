import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable } from 'react-table';
import { COLUMNS } from './IssueColumns';


const IssueList = ({ issues }) => {

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => issues, []);

    const tableInstance = useTable({
        columns,
        data
    });

    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow
    } = tableInstance;

    const [count, setCount] = useState(issues.length);

    return (
        <div className="issue-list">
            <h2>Issues ({ count })</h2>

            <table className="issue-table" { ...getTableProps() }>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr { ...headerGroup.getHeaderGroupProps() }>
                                {
                                    headerGroup.headers.map((column) => (
                                        <th { ...column.getHeaderProps() }>
                                            {
                                                column.render('Header')
                                            }
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
                {/* <tfoot>
                    {
                        footerGroups.map((footerGroup) => (
                            <tr { ...footerGroup.getFooterGroupProps() }>
                                {
                                    footerGroup.headers.map((column) => (
                                        <td { ...column.getFooterProps() }>
                                            {
                                                column.render('Footer')
                                            }
                                        </td>   
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tfoot> */}
            </table>
        </div>

    )

    // return (
    //     <div className="issue-list">
    //         <h2>Issues ({ count })</h2>
    //         <table className="issue-table">
    //             <thead>
    //                 <tr>
    //                     <th>Created On</th>
    //                     <th>Title</th>
    //                     <th>Author</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 { issues.map((issue) => (
    //                     <tr key={ issue.node.id }>
    //                         <td>
    //                             { Date(issue.node.createdAt) }
    //                         </td>
    //                         <td>
    //                             { <a href={ issue.node.url }>{ issue.node.title }</a> }
    //                         </td>
    //                         <td>
    //                             { issue.node.author.login }
    //                         </td>
    //                     </tr>
    //                 )) }
    //             </tbody>
    //         </table>
    //     </div>
    // );
}
 
export default IssueList;
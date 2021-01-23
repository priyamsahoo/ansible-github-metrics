import { format } from 'date-fns';
import { SelectColumnFilter } from './filters';



export const COLUMNS = [
    {
        Header: 'Created At',
        Footer: 'Created At',
        accessor: 'node.createdAt',
        Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') },
        disableFilters: true
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
        Header: 'Status',
        Footer: 'Status',
        accessor: 'node.state',
        Filter: SelectColumnFilter,
        filter: 'equals',
        disableSortBy: true
    },
    {
        Header: 'Title',
        Footer: 'Title',
        accessor: 'node.title',
        Cell: ({ cell: { value }, row: { original } }) => <a href={original.node.url} target="_blank">{value}</a>
    },
    {
        Header: 'Updated At',
        Footer: 'Updated At',
        accessor: 'node.updatedAt',
        Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') },
        disableFilters: true
    },
    {
        Header: 'Author',
        Footer: 'Author',
        accessor: 'node.author.login',
        disableFilters: true
    }
]
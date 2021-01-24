import moment from 'moment';
import { DateFilter, SelectColumnFilter } from './filters';
import { CenteredHeader } from './CenteredHeader';

export const COLUMNS = [
    {
        Header: CenteredHeader('Created At'),
        Footer: 'Created At',
        accessor: 'node.createdAt',
        Cell: ({ value }) => {
            return moment(new Date(value)).format('D/MM/yyyy');
        },
        disableSortBy: true,
        Filter: DateFilter,
        filter: (rows, columnId, filterValues) => {
            return filterValues;
        },
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
        Header: CenteredHeader('Status'),
        Footer: 'Status',
        accessor: 'node.state',
        Filter: SelectColumnFilter,
        filter: 'equals',
        disableSortBy: true,
    },
    {
        Header: CenteredHeader('Title'),
        Footer: 'Title',
        accessor: 'node.title',
        Cell: ({ cell: { value }, row: { original } }) => (
            <a href={original.node.url} target='_blank'>
                {value}
            </a>
        ),
    },
    {
        Header: CenteredHeader('Updated At'),
        Footer: 'Updated At',
        accessor: 'node.updatedAt',
        Cell: ({ value }) => {
            return moment(new Date(value)).format('D/MM/yyyy');
        },
        disableFilters: true,
    },
    {
        Header: CenteredHeader('Author'),
        Footer: 'Author',
        accessor: 'node.author.login',
        disableFilters: true,
    },
];

import React, { useEffect } from 'react';
import { Input, CustomInput } from 'reactstrap';
import * as moment from 'moment';

export const Filter = ({ column }) => {
    return (
        <div style={{ marginTop: 5 }}>
            {column.canFilter && column.render('Filter')}
        </div>
    );
};

export const DefaultColumnFilter = ({
    column: {
        filterValue,
        setFilter,
        preFilteredRows: { length },
    },
}) => {
    return (
        <Input
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`search (${length}) ...`}
        />
    );
};

export const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
}) => {
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    return (
        <CustomInput
            id='custom-select'
            type='select'
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}>
            <option value=''>All</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </CustomInput>
    );
};

export const DateFilter = (props) => {
    const {
        column: { setFilter, preFilteredRows },
    } = props;

    useEffect(() => {
        setFilter(filterByDate());
    }, []);

    const returnRows = (requiredDate) => {
        const todaysDate = moment();
        const requiredData = preFilteredRows.filter((row) => {
            return (
                moment(row.values['node.createdAt']).isAfter(requiredDate) &&
                moment(row.values['node.createdAt']).isBefore(todaysDate)
            );
        });
        return requiredData;
    };

    const filterByDate = (value = '1W') => {
        let requiredDate;
        switch (value) {
            case '1M':
                requiredDate = moment().subtract(1, 'month');
                return returnRows(requiredDate);
            case '3M':
                requiredDate = moment().subtract(3, 'months');
                return returnRows(requiredDate);
            case 'L3M':
                requiredDate = moment().subtract(3, 'months');
                const requiredData = preFilteredRows.filter((row) => {
                    return moment(row.values['node.createdAt']).isBefore(
                        requiredDate
                    );
                });
                return requiredData;
            default:
                requiredDate = moment().subtract(1, 'week');
                return returnRows(requiredDate);
        }
    };
    return (
        <Input
            type='select'
            onChange={(e) => {
                setFilter(filterByDate(e.target.value));
            }}>
            <option value='1W'>Past week</option>
            <option value='1M'>1 month</option>
            <option value='3M'>3 months</option>
            <option value='L3M'>&lt; 3 months</option>
        </Input>
    );
};

import React, { useEffect, useRef } from "react";
import { Input, CustomInput } from "reactstrap";
import * as moment from "moment";
import { DateRangePicker } from "rsuite";

export const Filter = ({ column }) => {
  return (
    <div style={{ marginTop: 5 }}>
      {column.canFilter && column.render("Filter")}
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
      value={filterValue || ""}
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
      id="custom-select"
      type="select"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </CustomInput>
  );
};

const RANGES = [
  {
    label: "Past week",
    value: [
      moment().subtract(6, "days").startOf("day").toDate(),
      moment().endOf("day").toDate(),
    ],
  },
  {
    label: "Past Month",
    value: [
      moment().subtract(29, "days").startOf("day").toDate(),
      moment().endOf("day").toDate(),
    ],
  },
  {
    label: "Past Three Months",
    value: [
      moment().subtract(89, "days").startOf("day").toDate(),
      moment().endOf("day").toDate(),
    ],
  },
];

export const DateFilter = (props) => {
  const {
    column: { setFilter, preFilteredRows },
  } = props;

  const valueRef = useRef([
    moment().subtract(13, "days").startOf("day").toDate(),
    moment().endOf("day").toDate(),
  ]);

  useEffect(() => {
    setFilter(filterByDate(valueRef.current));
  }, []);

  const filterByDate = (value) => {
    if (!value.length) {
      value = valueRef.current;
    }
    const [startDate, endDate] = value;

    return preFilteredRows.filter((row) => {
      return (
        moment(row.values["node.createdAt"]).isAfter(startDate) &&
        moment(row.values["node.createdAt"]).isBefore(endDate)
      );
    });
  };

  return (
    <DateRangePicker
      appearance="default"
      onChange={(value) => setFilter(filterByDate(value))}
      ranges={RANGES}
    />
  );
};

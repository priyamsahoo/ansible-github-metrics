import React, { useEffect, useRef } from "react";
import { CustomInput } from "reactstrap";
import * as moment from "moment";
import { DateRangePicker } from "rsuite";
import { Input, Select, DatePicker } from "antd";
// import { DatePicker, Space } from "antd";

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
      size="small"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
        // console.log(e.target.value);
      }}
      placeholder={`search (${length})`}
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

  const { Option } = Select;

  return (
    <Select
      size="small"
      style={{ width: 100 }}
      id="custom-select"
      type="select"
      defaultValue="All"
      // value={filterValue}
      onChange={(e) => {
        setFilter(e || undefined);
      }}
    >
      <Option value="">All</Option>Option
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
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

  const defValue = [
    moment().subtract(13, "days").startOf("day"),
    moment().endOf("day"),
  ];

  useEffect(() => {
    setFilter(filterByDate(defValue));
  }, []);

  const filterByDate = (value) => {
    if (!value) {
      value = defValue;
    }
    const [startDate, endDate] = value;

    return preFilteredRows.filter((row) => {
      return (
        moment(row.values["node.createdAt"]).isAfter(startDate._d) &&
        moment(row.values["node.createdAt"]).isBefore(endDate._d)
      );
    });
  };
  const { RangePicker } = DatePicker;
  return (
    // <DateRangePicker
    //   appearance="default"
    //   defaultValue={[
    //     moment().subtract(30, "days").startOf("day").toDate(),
    //     moment().endOf("day").toDate(),
    //   ]}
    //   // onChange={(value) => setFilter(filterByDate(value))}
    //   onChange={(value) => console.log(value)}
    //   ranges={RANGES}
    // />
    <RangePicker
      size="small"
      format="ll"
      ranges={{
        Today: [moment(), moment()],
        "This Month": [moment().startOf("month"), moment().endOf("month")],
        "Past Month": [
          moment().subtract(29, "days").startOf("day"),
          moment().endOf("day"),
        ],
        "Past Week": [
          moment().subtract(6, "days").startOf("day"),
          moment().endOf("day"),
        ],
      }}
      defaultValue={[
        moment().subtract(13, "days").startOf("day"),
        moment().endOf("day"),
      ]}
      defaultPickerValue={[
        moment().subtract(13, "days").startOf("day"),
        moment().endOf("day"),
      ]}
      onChange={(value) => setFilter(filterByDate(value))}
      // onChange={(value) => console.log(value[0]._d, value[1]._d)}
    />
  );
};

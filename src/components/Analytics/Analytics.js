import { useQuery } from "@apollo/client";
import { TEST } from "../../queries/analytics_queries";
import { groupByMonth } from "./groupByMonth";
import { useState } from "react";
import ChartTest from "./ChartTest";

const Analytics = () => {
  //   const MONTHS = () => {
  //     const months = [];
  //     const dateStart = moment().subtract(1, "month");
  //     const dateEnd = moment().subtract(12, "months");
  //     while (dateEnd.diff(dateStart, "months") <= 0) {
  //       months.push(dateStart.format("MMMM"));
  //       dateStart.subtract(1, "months");
  //     }
  //     return months;
  //   };
  //   console.log(MONTHS());

  const { loading, error, data } = useQuery(TEST, {
    fetchPolicy: "cache-and-network",
  });

  let d = {};
  if (data) {
    d = groupByMonth(data.repository.issues.nodes);
  }
  return (
    <div className="analytics">
      <h2>Analytics</h2>
      <p>{JSON.stringify(d)}</p>
      <br></br>
      {d && <ChartTest d={d} />}
    </div>
  );
};

export default Analytics;

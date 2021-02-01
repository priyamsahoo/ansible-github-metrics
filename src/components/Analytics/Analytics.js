import { useQuery } from "@apollo/client";
import { TEST } from "../../queries/analytics_queries";
import { groupByMonth } from "./groupByMonth";

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

  const { loading, error, data } = useQuery(TEST);

  if (data) {
    const monthWiseData = groupByMonth(data.repository.issues.nodes);
    console.log(monthWiseData);
  }

  return (
    <div className="analytics">
      <h2>Analytics</h2>
      {/* <p>{MONTHS().join(", ")}</p> */}
    </div>
  );
};

export default Analytics;

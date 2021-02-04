import moment from "moment";
import _ from "lodash";

export const calculateAverageDays = (data) => {
  //   const map_result = _.map(data, function (item) {
  //     const startDate = moment(item.createdAt);
  //     const endDate = item.closedAt
  //       ? new moment(item.closedAt)
  //       : new moment(item.mergedAt);
  //     // const month = monthNames[d.getMonth()] + " " + d.getFullYear();
  //     console.log("S DATE", startDate._i);
  //     console.log("E DATE", endDate._i);
  //     // console.log(endDate.fromNow());
  //     console.log(endDate.diff(startDate, "days"));
  //     return {
  //       Difference: endDate.diff(startDate, "days"),
  //     };
  //   });

  let totalDaysDifference = 0;
  data.map((item) => {
    const startDate = moment(item.createdAt);
    const endDate = item.closedAt
      ? moment(item.closedAt)
      : moment(item.mergedAt);
    const diff = endDate.diff(startDate, "days");
    totalDaysDifference += diff;
    // console.log("Start Date: ", startDate);
    // console.log("End Date: ", endDate);
    // console.log("Diff: ", diff);
  });

  //   console.log("Length: ", data.length);
  return Math.floor(totalDaysDifference / data.length);
};

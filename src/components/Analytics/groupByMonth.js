import _, { map, reduce } from "underscore";

export const groupByMonth = (data) => {
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var map_result = _.map(data, function (item) {
    var d = new Date(item.createdAt);
    var month = monthNames[d.getMonth()] + " " + d.getFullYear();
    return {
      Month: month,
      Count: 1,
    };
  });

  var result_temp = _.reduce(
    map_result,
    function (memo, item) {
      if (memo[item.Month] === undefined) {
        memo[item.Month] = item.Count;
      } else {
        memo[item.Month] += item.Count;
      }
      return memo;
    },
    {}
  );

  //then wrap the result to the format you expected.
  var result = _.map(result_temp, function (value, key) {
    return {
      Month: key,
      Count: value,
    };
  });
  console.log(result);
  return result;
};

import _, { map, reduce } from "underscore";

export const groupByMonth = (data) => {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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

  return result;
};

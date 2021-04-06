import * as _ from "lodash";

const tempFunction = (type, month, count1, count2 = 0) => {
  let data = {};
  console.log(type);
  console.log(month);
  console.log(count1);
  console.log(count2);
  if (type === "open") {
    data = {
      Month: month,
      open: count1,
      closed: count2,
    };
  } else if (type === "closed") {
    data = {
      Month: month,
      closed: count1,
      open: count2,
    };
  } else {
    data = {
      Month: month,
      merged: count1,
      open: count2,
    };
  }

  console.log("DATA from assemble-data", data);
  return data;
};

export const assembleData = (array1, array2, type) => {
  if (array1.length === array2.length) {
    return _.chain([])
      .zip(array1, array2)
      .flatten()
      .filter((data) => data !== undefined)
      .map((data, index) => {
        if (index % 2 === 0) {
          return {
            Month: data.Month,
            open: 0,
            [type]: data.Count,
          };
        } else {
          return {
            Month: data.Month,
            [type]: 0,
            open: data.Count,
          };
        }
      })
      .value();
  }
  return array1.map((issue) => {
    const { Month, Count } = issue;

    const temp = array2.find((elem) => elem.Month === Month);
    console.log("temp", temp);
    if (!temp) {
      return tempFunction(type, Month, Count);
    }
    return tempFunction(type, Month, Count, temp.Count);
  });
};

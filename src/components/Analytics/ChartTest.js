import { Bar, Line } from "react-chartjs-2";

const ChartTest = ({ dataGroupedByMonth: data }) => {
  //   console.log(d);

  //   let data = [
  //     { Month: "April 2020", Count: 7 },
  //     { Month: "May 2020", Count: 6 },
  //     { Month: "June 2020", Count: 12 },
  //     { Month: "July 2020", Count: 16 },
  //     { Month: "August 2020", Count: 4 },
  //     { Month: "September 2020", Count: 15 },
  //     { Month: "October 2020", Count: 7 },
  //     { Month: "November 2020", Count: 10 },
  //     { Month: "December 2020", Count: 7 },
  //     { Month: "January 2021", Count: 10 },
  //   ];

  // const dataToPlot = {
  //   labels: data.map((item) => item.Month),
  //   datasets: [
  //     {
  //       label: "My First dataset",
  //       backgroundColor: "rgba(255,99,132,0.2)",
  //       borderColor: "rgba(255,99,132,1)",
  //       borderWidth: 1,
  //       hoverBackgroundColor: "rgba(255,99,132,0.4)",
  //       hoverBorderColor: "rgba(255,99,132,1)",
  //       data: data.map((item) => item.Count),
  //     },
  //   ],
  // };

  console.log(data);
  const dataToPlot = {
    labels: data.map((item) => item.Month),
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data.map((item) => item.Count),
      },
    ],
  };

  return (
    <div className="chart-test">
      <h2>Chart</h2>
      <p>{JSON.stringify(data)}</p>

      <h2>Bar Example (custom size)</h2>
      <div className="chart">
        <h2>Line Example</h2>
        <Line data={dataToPlot} />
      </div>
    </div>
  );
};

export default ChartTest;

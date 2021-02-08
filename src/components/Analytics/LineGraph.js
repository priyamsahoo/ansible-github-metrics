import { Card } from "antd";
import { Line } from "react-chartjs-2";

const LineGraph = ({ dataGroupedByMonth: data, label, heading }) => {
  // console.log(totalOpenIssues);
  console.log(data);
  const dataToPlot = {
    labels: data.map((item) => item.Month),
    datasets: [
      {
        label: label,
        fill: true,
        lineTension: 0.1,
        // backgroundColor: "rgba(75,192,192,0.4)",
        // borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(205,142,59,0.1)",
        borderColor: "rgba(205,142,59,1)",
        borderWidth: 1,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(242, 200, 15, 1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(242, 200, 15, 1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        // data: data.map((item) =>
        //   (item.open / (totalOpenIssues - item.closed)).toFixed(2)
        data: data.map((item) =>
          ((item.closed / (item.open + item.closed)) * 100).toFixed(2)
        ),
      },
    ],
  };

  const option = {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "% of closed issues",
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var currentValue = dataset.data[tooltipItem.index];
          return currentValue + "%";
        },
      },
    },
  };

  console.log("Plotting data: ", dataToPlot.datasets[0].data);

  return (
    <div className="chart-line">
      <h3>{heading}</h3>
      <Line data={dataToPlot} />
    </div>
  );
};

export default LineGraph;

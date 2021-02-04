import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Card } from "antd";

const DoughnutGraph = ({ heading, label1, data1, label2, data2 }) => {
  //   console.log(data);
  const dataToPlot = {
    labels: [label1, label2],
    datasets: [
      {
        data: [data1, data2],
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
      },
    ],
  };

  return (
    <Card className="chart" title={heading}>
      <Doughnut data={dataToPlot} />
    </Card>
  );
};

export default DoughnutGraph;

import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartComponent = ({ transactions }) => {
  const chartData = {
    options: {
      chart: {
        id: "basic-line", 
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: transactions.map((transaction) => transaction.date),
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      colors: ["var(--primary-purple)"],
    },
    series: [
      {
        name: "Amount",
        data: transactions.map((transaction) => transaction.amount),
      },
    ],
  };

  return (
    <ReactApexChart
      options={chartData.options}
      series={chartData.series}
      type="line"
      height={350}
    />
  );
};

export default ChartComponent;

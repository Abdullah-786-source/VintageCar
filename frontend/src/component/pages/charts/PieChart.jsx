import React, {useState, useEffect} from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "Order Status",
  is3D: true,
};

export default function PieChart() {

    const [newdata, setnewData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/Status`);
        // Transform product data into the format expected by react-google-charts
        console.log(response.data);
        const chartData = [
          ["Status", "Count"],
          ...response.data.map(status => [status.label, status.value])
        ];
        setnewData(chartData);
        console.log(chartData);
      } catch (error) {
        console.error("Error fetching status data:", error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchData();
  }, []);
  return (
    <Chart
      chartType="PieChart"
      data={newdata}
      options={options}
      width={"100%"}
      height={"300px"}
    />
  );
}
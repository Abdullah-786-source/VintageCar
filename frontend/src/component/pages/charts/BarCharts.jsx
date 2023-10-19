import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export const options = {
  chart: {
    title: "Top Product",
    subtitle: "Top 10 product sold",
  },
  hAxis: {
    title: "Product",
    titleTextStyle: {
      fontSize: 14, // Adjust font size as needed
      bold: true, // Make the title bold if necessary
    },
  },
  tooltip: {
    trigger: "focus",
    isHtml: true,
    text: "<b>Product:</b> {0}<br/><b>Sales:</b> {1}",
  },
};

export default function NewBarChart() {
  const [newdata, setnewData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/TopProducts`);
        // Transform product data into the format expected by react-google-charts
        const chartData = [
          ["Product", "Sales"],
          ...response.data.map((product) => [product.productName.substring(0, 10), product.product]),
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
      chartType="Bar"
      width="100%"
      height="400px"
      data={newdata}
      options={options}
    />
  );
}

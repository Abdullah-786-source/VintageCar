import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";

export const options = {
  chart: {
    title: "Customers",
    subtitle: "Top 5 customers by country",
  },
  hAxis: {
    title: "Product",
    titleTextStyle: {
      fontSize: 14, // Adjust font size as needed
      bold: true, // Make the title bold if necessary
    },
    slantedText: true, // Allow slanted text
    slantedTextAngle: 45, // Set the angle for slanted text
  },
};

export default function NewBarChart() {
  const [newdata, setnewData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/Country`);
        // Transform product data into the format expected by react-google-charts
        const chartData = [
          ["Country", "No. of customers"],
          ...response.data.map(country => [country.country, country.val])
        ];
        setnewData(chartData);
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
      height="300px"
      data={newdata}
      options={options}
    />
  );
}

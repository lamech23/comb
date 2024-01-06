import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const UserGraph = ({ users }) => {
  // Create a ref to hold the chart element.
  const chartRef = useRef(null);

  function generateMonthLabels(monthCount) {
    const labels = [];
    const currentDate = new Date();

    for (let i = 0; i < monthCount; i++) {
      const date = new Date();
      
      date.setMonth(currentDate.getMonth() - i); // Subtract months to go back in time
      const monthLabel = date.toLocaleDateString("default", { month: "short" });
      labels.push(monthLabel); // Add the month label to the beginning of the array
    }

    return labels
  }

  useEffect(() => {
    // Define data for the chart.
    const labels = generateMonthLabels(12);
    const data = [users];
    

    if (chartRef.current) {
      // If a chart instance exists, destroy it to prevent duplicates.
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Create a new line chart using Chart.js.
      chartRef.current.chart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "user Data ",
              data: data,
              borderColor: "rgba(355, 192, 192, 1)",
              backgroundColor: "rgba(255, 252, 192, 0.2)",
              borderWidth: 1,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Months",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "users",
              },
            },
          },
        },
      });
    }
  }, [users]);

  return (
    <div className="mt-6">
      <canvas ref={chartRef} id="myGraph" width="200" height="300"></canvas>
    </div>
  );
};

const Graph = ({ users }) => {
  return (
    <div className="p-5 m-3">
      <div className="">
        <UserGraph users={users} />
      </div>
    </div>
  );
};

export default Graph;

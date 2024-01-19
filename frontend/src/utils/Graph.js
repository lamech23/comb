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
      date.setMonth(currentDate.getMonth() + i); // Subtract months to go back in time
      const monthLabel = date.toLocaleDateString("default", { month: "short" });
      labels.push(monthLabel);
    }

    return labels;
  }

  function countUsers(users) {
    const userCountByMonth = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };
    users.forEach((user) => {
      const month = new Date(user.createdAt).toLocaleString("default", {
        month: "short",
      });
      // const months = generateMonthLabels(month)
      Math.floor(userCountByMonth[month] += 1)
    });
    return Object.values(userCountByMonth);
  }
  const userCounts = countUsers(users);

  useEffect(() => {
    // Define data for the chart.
    const labels = generateMonthLabels(12);
    const data = userCounts

    if (chartRef.current) {
      // If a chart instance exists, destroy it to prevent duplicates.
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Create a new line chart using Chart.js.
      chartRef.current.chart = new Chart(chartRef.current, {
        type: "line",
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
    <div className="grid grid-col-2">
      <div className=" col-span-3">
        <UserGraph users={users} />
      </div>
      <div >
        <p>
          fucker
        </p>
      </div>
    </div>
  );
};

export default Graph;

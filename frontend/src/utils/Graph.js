import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const UserGraph = ({ users }) => {
  // Create a ref to hold the chart element.
  const chartRef = useRef(null);

  function generateMonthLabels(monthCount) {
    const labels = [];
    const currentDate = new Date();
    currentDate.setMonth(0);

    for (let i = 0; i < monthCount; i++) {
        const date = new Date(currentDate); 
        date.setMonth(date.getMonth() + i);
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
      Math.floor(userCountByMonth[month] +=1);
    });
    return Object.values(userCountByMonth);
  }
  const userCounts = countUsers(users);

  useEffect(() => {
    // Define data for the chart.
    const labels = generateMonthLabels(12);
    const data = userCounts

    if (chartRef.current) {
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
              borderColor: "rgba(340, 0, 0, 2)",
              backgroundColor: "rgba(240, 0 , 0, 2)",
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
              display: false,
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
    <div className="mt-6 ">
      <canvas ref={chartRef} id="myGraph" width="200" height="300"></canvas>
    </div>
  );
};




const Graph = ({ users }) => {
  return (
    <div className="mt-4">
      <div className="  shadow-xl rounded-lg p-4 mt-20 mb-20   lg:w-[60rem]">
        <UserGraph users={users} />
      </div>
      
    </div>
  );
};

export default Graph;

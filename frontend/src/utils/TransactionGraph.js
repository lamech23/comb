import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Transaction = ({ payments }) => {
  // Create a ref to hold the chart element.

  console.log(payments);
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
  function countPayment(payment) {
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
    payment.forEach((item) => {
      const month = new Date(item.createdAt).toLocaleString("default", {
        month: "short",
      });
    
      Math.floor((userCountByMonth[month] += 1));

    });
    return Object.values(userCountByMonth);
  }
  const paymentCounts = countPayment(payments);

  useEffect(() => {
    // Define data for the chart.
    const labels = generateMonthLabels(12);
    const data = paymentCounts;

    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Create a new line chart using Chart.js.
      chartRef.current.chart = new Chart(chartRef.current, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Payments 1",
              data: data,
               backgroundColor : [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(153, 102, 255)",
                "rgb(255, 159, 64)",
                "rgb(255, 0, 255)",
                "rgb(0, 255, 255)",
                "rgb(128, 128, 128)",
                "rgb(255, 0, 0)",
                "rgb(0, 128, 0)",
                "rgb(0, 0, 255)",
              ],
              borderWidth: [0, 4, 8],
              hoverOffset: 4,
            },
            
          ],
        },

        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutoutpercentage: 60,

          scales: {
            x: {
              display: false,
              title: {
                display: true,
                text: "Months",
              },
            },

            y: {
              display: false,
              title: {
                display: true,
                text: "users",
              },
            },
          },
        },
      });
    }
  }, [payments]);

  return (
    <div className="mt-6 ">
      <canvas ref={chartRef} id="myGraph" width="200" height="300"></canvas>
    </div>
  );
};

const TransactionGraph = ({ payments }) => {
  return (
    <div className="mt-4">
      <div className="  shadow-xl rounded-lg p-4 mt-20 mb-20   lg:w-[60rem]">
        <Transaction payments={payments} />
      </div>
    </div>
  );
};

export default TransactionGraph;

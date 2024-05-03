import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ payments }) => {
  // Create a ref to hold the chart element.

  const confirmedPayment = payments?.filter(
    (item) => item.status == "confirmed"
  );

  const rejectedPayment = payments?.filter((item) => item.status == "reject");

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
  const confirmed = countPayment(confirmedPayment);
  const rejected = countPayment(rejectedPayment);

  useEffect(() => {
    // Define data for the chart.
    const labels = generateMonthLabels(12);
    const data = paymentCounts;
    const data2 = confirmed;
    const data3 = rejected;
    if (chartRef.current) {
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
              label: "payments ",
              data: data,
              borderColor: "border-blue-400",
              borderWidth: 0.5, 
              fill: true,
              tension: 0.4

            },
            
            {
              label: "confirmed payment ",
              data: data2,
              borderColor: "rgba(0, 255, 0, 1)",
              borderWidth: 0.5, 
              fill: true,
              tension: 0.4
            },
            {
              label: "rejected payment ",
              data: data3,
              borderColor: "border-red-600",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
              borderWidth: 0.5, 
              fill: true,
              tension: 0.4
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
              }
              
         
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

const PieGraph = ({ payments }) => {
  return (
    <div className="mt-4">
      <div className="  shadow-xl rounded-lg p-4 mt-20 mb-20   lg:w-[60rem]">
        <PieChart payments={payments} />
      </div>
    </div>
  );
};

export default PieGraph;

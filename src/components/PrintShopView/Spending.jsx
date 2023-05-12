import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { Tooltip } from 'react-tooltip';

const Spending = () => {
  const [chart, setChart] = useState(null);
  const [tooltipContent, setTooltipContent] = useState(null);

  const chartRef = useRef(null);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = today.toLocaleString('default', { month: 'long' }); //January is 0!
  const yyyy = today.getFullYear();
  const date = mm + ' ' + dd;

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Money Spent',
        // We'll dynamically push data to this data array. It goes from January to December, so the first number in the array will be charted for January and so forth.
        data: [300, 800, 450, 320],
        backgroundColor: '#1baded',
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHitRadius: 6,
        barPercentage: 0.3, // Adjust the value to make bars skinnier (0.0 to 1.0)
        borderRadius: 10,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
            display: false,
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
            display: false,
        }
      },
    },
    plugins: {
      tooltip: {
        enabled: true, // Enable tooltips
        callbacks: {
          label: (context) => `Money Spent: $${context.parsed.y}`, // Customize tooltip label
        },
      },
      legend: {
        display: false,
      },
    },
    onHover: (event, chartElements) => {
      const { element } = chartRef.current;
      // console.log(element)
      if (element) {
        element.style.cursor = chartElements && chartElements.length > 0 ? 'pointer' : 'default';
      }
    },
  };

  useEffect(() => {
    if (chart) {
      chart.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    const newChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

    setChart(newChart);

    return () => {
      newChart.destroy();
    };
  }, []);

  // Rest of the code...

  return (
    <div className='bg-white h-full rounded-lg drop-shadow-md font-genaPrimary p-4 w-full'>
        <div className="mb-10">
            {/* Spending Report: */}
            {/* {tooltipContent && tooltipContent.raw && tooltipContent.raw[0] ? tooltipContent.raw[0].y : ''} */}
            <p className='text-2xl'>$236.40</p>
        </div>
      <div>
        <canvas className='w-[35.5rem]' ref={chartRef} id="line-chart" />
        {tooltipContent && tooltipContent.raw && tooltipContent.raw.y && (
            <Tooltip place="top" type="dark" effect="solid">
                {tooltipContent.raw.y}
            </Tooltip>
        )}
      </div>
    </div>
  );
};

export default Spending;
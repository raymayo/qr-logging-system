// src/components/DoughnutChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const DoughnutChart = ({ data }) => {
    const config = {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
                display: false,
              position: 'bottom',
            },
            title: {
              display: false,
              text: 'Visitor by Course',
              color:'#000',
              font: {
                size: 20,
                family: 'Inter',
                weight: 500,
              }
            },
            tooltip:{
                backgroundColor:'#f4f4f5',
                titleColor:'black',
                bodyColor:'black',
                borderColor: 'black',
                borderWidth: 1,
                boxWidth:15,
                boxHeight:15,
                titleFont: {
                    family: 'Inter',
                    size: 16, // Font size for the tooltip title
                  },
                bodyFont:{
                    family: 'Inter',
                    size:14
                },
                
            }
          }
        },
      };

  return <Doughnut data={data} options={config.options} className=' max-h-40 max-w-fit'/>;
};

export default DoughnutChart;

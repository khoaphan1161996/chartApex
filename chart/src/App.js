import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

function App() {
  const [options, setObject] = useState({
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [],
    },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    const age = []
    const salaries = []

    axios.get('http://dummy.restapiexample.com/api/v1/employees')
      .then(response => {
        response.data.data.map(item => {
          age.push(item.employee_age)
          salaries.push(item.employee_salary)
        })

        setObject(prev => {
          const newOptions = {...prev}
          newOptions.xaxis.categories = salaries
          return newOptions
        })

        setSeries(prev => {
          const newSeries = [...prev]
          newSeries.push({
            name:`series-1`,
            data: age
          })
          return newSeries
        })
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width={500}
      height={320}
    />
  );
}

export default App;

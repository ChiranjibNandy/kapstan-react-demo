import React, { useEffect } from "react";
import { Box, Tab, Tabs, Card } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import "./CPUandMemUtilCard.css"; // Import the CSS file

const transformData = (data, key) => {
  if (!data) return [];
  let transformedData = data.map((item) => {
    return {
      x: new Date(parseInt(item.timestamp) * 1000),
      y: parseFloat(item[key]),
    };
  });
  transformedData.sort((a, b) => a.x - b.x);

  return transformedData;
};

const options = (data, title) => ({
  title: {
    text: title,
  },
  xAxis: {
    type: "datetime",
    dateTimeLabelFormats: {
      day: "%I %p",
    },
    title: {
      text: "Timestamp",
    },
  },
  yAxis: {
    title: {
      text: title,
    },
    tickInterval: 10,
  },
  series: [
    {
      data: transformData(data, title),
      name: title,
      type: "line",
    },
  ],
});

const CPUandMemUtilCard = ({ data }) => {
  const { memUtil, cpuUtil } = data;
  const [value, setValue] = React.useState(0);
  const [chartOptions, setChartOptions] = React.useState(null);
  const [initialValue, setInitialValue] = React.useState(0); // Add a new state for the initial value

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // Call the API with the initial value when the component mounts
    fetchData(initialValue);

    // Call the API whenever the value changes
    const handleValueChange = () => {
      fetchData(value);
    };

    handleValueChange();

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("change", handleValueChange);
    };
  }, [value, initialValue]);
  // Fetch data based on the selected value
  const fetchData = (selectedValue) => {
    if (cpuUtil && memUtil) {
      setChartOptions(
        selectedValue === 0
          ? options(cpuUtil, "cpuUtilization")
          : options(memUtil, "memoryUtilization")
      );
    }
  };
  //   useEffect(() => {
  //     if (cpuUtil && memUtil) {
  //       setChartOptions(
  //         value === 0
  //           ? options(cpuUtil, "cpuUtilization")
  //           : options(memUtil, "memoryUtilization")
  //       );
  //     }
  //   }, [memUtil, cpuUtil, value]);
  return (
    <div>
      <h3>System metrics</h3>
      <Card className="card">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="utilization tabs"
            >
              <Tab label="CPU" />
              <Tab label="Memory" />
            </Tabs>
          </Box>
          {chartOptions && (
            <div className="chart-container">
              <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                reflow={false}
              />
            </div>
          )}
        </Box>
      </Card>
    </div>
  );
};

export default CPUandMemUtilCard;

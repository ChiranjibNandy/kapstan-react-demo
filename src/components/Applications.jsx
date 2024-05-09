import React, { useState, useEffect } from "react";
import { Tab, Tabs, Select, MenuItem, Box } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import ConstructionIcon from "@mui/icons-material/Construction";
import WarningIcon from "@mui/icons-material/Warning";
import HistoryIcon from "@mui/icons-material/History";
import { Overview } from "./Overview";
import { EnvironmentVariables } from "./EnvironmentVariables";

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const Applications = () => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [tabData, setTabData] = useState({
    overviewTab: [],
    envTab: [],
    alertsTab: [],
    eventHistoryTab: [],
  });

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    // Fetch dropdown options from API
    fetchData("https://retoolapi.dev/71NNjB/applications").then((data) => {
      setDropdownOptions(data);
      if (data.length > 0) {
        setSelectedOption(data[0].name); // Set the first option as the selected option
      }
    });
  }, []);

  const handleDropdownChange = async (event) => {
    const selectedOption = event.target.value;
    setSelectedOption(selectedOption);
    // Fetch data for tabs based on selected option
    const overviewTabMemUtilisationData = await fetchData(
      `https://retoolapi.dev/ybFVVH/memoryutilization`
    );
    const overviewTabEventHistoryData = await fetchData(
      `https://retoolapi.dev/TYjDIe/eventhistory`
    );
    const overviewTabCPUUtilisationData = await fetchData(
      `https://retoolapi.dev/Ymxfa2/cpuutilization`
    );
    const overviewTabData = {
      memUtil: overviewTabMemUtilisationData,
      evtHistory: overviewTabEventHistoryData,
      cpuUtil: overviewTabCPUUtilisationData,
    };
    setTabData({
      overviewTab: overviewTabData,
      envTab: [],
      alertsTab: [],
      eventHistoryTab: overviewTabEventHistoryData,
    });
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const renderTabContent = (index) => {
    switch (index) {
      case 0:
        return <Overview data={tabData.overviewTab} />;
      case 1:
        return <EnvironmentVariables />;
      case 2:
        return <Overview />;
      case 3:
        return <EnvironmentVariables />;
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h5>Applications</h5>
      <Select value={selectedOption} onChange={handleDropdownChange}>
        {dropdownOptions.map((option) => (
          <MenuItem key={option.id} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      <hr />
      {selectedOption && (
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              aria-label="Applications Tabs"
            >
              <Tab icon={<ComputerIcon />} label="Overview" />
              <Tab icon={<ConstructionIcon />} label="Environment Variables" />
              <Tab icon={<WarningIcon />} label="Alerts" />
              <Tab icon={<HistoryIcon />} label="History" />
            </Tabs>
          </Box>
          {renderTabContent(selectedTab)}
        </Box>
      )}
    </div>
  );
};

export default Applications;

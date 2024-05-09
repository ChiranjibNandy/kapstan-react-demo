import React from "react";
import CPUandMemUtilCard from "./cards/CPUandMemUtilCard";
import { EventHistoryCard } from "./cards/EventHistoryCard";
import "./Overview.css";
import ServiceInfoCard from "./cards/ServiceInfoCard";

export const Overview = (props) => {
  return (
    <div className="container">
      <div className="full-width-card">
        <ServiceInfoCard data={props.optionData} />
      </div>
      <div className="card-row">
        <div className="half-width-card">
          <CPUandMemUtilCard data={props.utilAndEvtData} />
        </div>
        <div className="half-width-card">
          <EventHistoryCard data={props.utilAndEvtData} />
        </div>
      </div>
    </div>
  );
};

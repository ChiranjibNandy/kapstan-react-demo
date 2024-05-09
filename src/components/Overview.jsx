import React from "react";
import CPUandMemUtilCard from "./cards/CPUandMemUtilCard";
import { EventHistoryCard } from "./cards/EventHistoryCard";

export const Overview = (props) => {
  return (
    <div className="container">
      <CPUandMemUtilCard data={props.data} />
      <CPUandMemUtilCard data={props.data} />
      <EventHistoryCard data={props.data} />
    </div>
  );
};

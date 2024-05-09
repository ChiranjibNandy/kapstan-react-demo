import React from "react";
import "./EventHistoryCard.css";

export const EventHistoryCard = ({ data }) => {
  const { evtHistory } = data;
  return (
    <div class="card">
      <table>
        <tr>
          <th>Event</th>
          <th>Version</th>
          <th>Status</th>
        </tr>
        {evtHistory &&
          evtHistory.length > 0 &&
          evtHistory.map((item) => (
            <tr key={item.id}>
              <td>{item.event}</td>
              <td>{item.version}</td>
              <td className={`status ${item.status}`}>{item.status}</td>
            </tr>
          ))}
      </table>
      <p className="view-more" onClick={() => {}}>
        View More
      </p>
    </div>
  );
};

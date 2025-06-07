import React from "react";
import NavBar from "../NavBar/NavBar";
import "./Charts.css";

const ChartComponent = ({ chartUrl }) => {
  return (
    <div className="chart-container">
      <iframe src={chartUrl} title="Chart" width="100%" height="400"></iframe>
    </div>
  );
};

const Charts = () => {
  return (
    <div className="">
      <NavBar />
      <h1>Vehicle Information Graphs</h1>
      <div className="charts-wrapper">
        <div className="charts-container">
          <ChartComponent chartUrl="https://thingspeak.com/channels/2495559/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15" />
          <ChartComponent chartUrl="https://thingspeak.com/channels/2495559/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&xaxis=time&yaxis=temp" />
        </div>
      </div>
    </div>
  );
};

export default Charts;

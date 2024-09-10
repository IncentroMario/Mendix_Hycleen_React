import React from "react";
import "./SensorsDataLegend.css";

const SensorsDataLegend = ({ data }) => {
  const items = data.items;

  const sensorsWithTemperature = items.filter(
    (item) =>
      item.temperature !== "" &&
      item.temperature !== null &&
      item.temperature !== undefined
  );

  const sensorsWithoutTemperature = items.filter(
    (item) =>
      item.temperature === "" ||
      item.temperature === null ||
      item.temperature === undefined
  );

  return (
    <div className="sensors-container">
      <div className="sensors-with-temperature">
        <div className="sensors-grid">
          {/* {sensorsWithTemperature.map((sensor, index) => ( */}
          {sensorsWithoutTemperature.map((sensor, index) => (
            <div key={index} className="sensor-item">
              <span className="sensor-item_circle__element"></span>
              {sensor.name}
            </div>
          ))}
        </div>
      </div>

      <div className="sensors-without-temperature">
        <h3>Sensors without Temperature data</h3>
        <div className="sensors-grid">
          {sensorsWithoutTemperature.map((sensor, index) => (
            <div key={index} className="sensor-item">
              <span className="sensor-item_circle__element"></span>
              {sensor.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SensorsDataLegend;

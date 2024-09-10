import React, { useState, useEffect } from "react";
import "./App.css";
import VisibilityButtons from "./components/visbilityButtons/VisibilityButtons";
import HorizontalBarTable from "./components/charts/HorizontalBarChart";
import SensorsDataLegend from "./components/sensorsDataLegend/SensorsDataLegend";
import LineChart from "./components/charts/LineChart";
import ChartData from "./data/charts";
import { ensureArrayLength } from "./utils/Utils";

const App = () => {
  const [dataHorizontal, setDataHorizontal] = useState([]);
  const [visibleBars, setVisibleBars] = useState([]);

  useEffect(() => {
    // Transformar y ajustar datos aquí
    const adjustedDataHorizontal = ensureArrayLength(ChartData.dataBarChart);
    setDataHorizontal(adjustedDataHorizontal);

    // Inicializar visibilidad de barras según los datos
    setVisibleBars(new Array(adjustedDataHorizontal.length).fill(true));
  }, []);

  const toggleBarVisibility = (index) => {
    setVisibleBars((prev) =>
      prev.map((visible, i) => (i === index ? !visible : visible))
    );
  };

  return (
    <div className="container">
      <VisibilityButtons
        dataHorizontal={dataHorizontal}
        visibleBars={visibleBars}
        toggleBarVisibility={toggleBarVisibility}
        colors={ChartData.colors}
      />
      <div className="container__lineal">
        <div className="container__lineal--two">
          <LineChart
            data={ChartData.dataLinealChart}
            visibleBars={visibleBars}
            colors={ChartData.colors}
            dataOnHorizontalAxisEach={2}
          />
          <LineChart
            data={ChartData.dataLinealChart}
            visibleBars={visibleBars}
            colors={ChartData.colors}
            dataOnHorizontalAxisEach={3}
          />
        </div>
        <LineChart
          data={ChartData.dataLinealChart}
          visibleBars={visibleBars}
          colors={ChartData.colors}
          dataOnHorizontalAxisEach={3}
        />
        <SensorsDataLegend
          data={ChartData.dataLinealChart}
          colors={ChartData.colors}
        />
      </div>
      <div className="container__bar">
        <HorizontalBarTable
          data={dataHorizontal}
          visibleBars={visibleBars}
          colors={ChartData.colors}
        />
      </div>
    </div>
  );
};

export default App;

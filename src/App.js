import React, { useState, useEffect } from "react";
import VisibilityButtons from "./components/visbilityButtons/VisibilityButtons";
import HorizontalBarTable from "./components/charts/HorizontalBarChart";
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
    <div style={{ margin: "40px" }}>
      <VisibilityButtons
        dataHorizontal={dataHorizontal}
        visibleBars={visibleBars}
        toggleBarVisibility={toggleBarVisibility}
        colors={ChartData.colors}
      />
      <LineChart
        data={ChartData.dataLinealChart}
        visibleBars={visibleBars}
        colors={ChartData.colors}
      />
      <LineChart
        data={ChartData.dataLinealChart}
        visibleBars={visibleBars}
        colors={ChartData.colors}
      />
      <LineChart
        data={ChartData.dataLinealChart}
        visibleBars={visibleBars}
        colors={ChartData.colors}
      />
      <HorizontalBarTable
        data={dataHorizontal}
        visibleBars={visibleBars}
        colors={ChartData.colors}
      />
    </div>
  );
};

export default App;

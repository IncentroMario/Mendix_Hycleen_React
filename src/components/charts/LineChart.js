import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";

const transformData = (data, colors, visibleBars) => {
  const dates = data.dates;
  const items = data.items;

  const series = items.map((item, index) => ({
    name: item.name,
    type: "line",
    data: visibleBars[index]
      ? item.avgTemp
      : new Array(item.avgTemp.length).fill(null),
    itemStyle: {
      color: colors[index % colors.length],
    },
  }));

  return { dates, series };
};

const formatTooltip = (
  params,
  dates,
  visibleBars,
  dataOnHorizontalAxisEach
) => {
  const date = dates[params[0]?.dataIndex] || "No Date";

  const tooltips = params
    .filter((param) => visibleBars[param.seriesIndex]) // Filtra solo los valores de las series visibles
    .map(({ marker, value }) => `${marker} ${value} °C`)
    .join("<br/>");

  return `
    <div style="padding: 5px; border-radius: 5px;">
      ${date}<br/>
      ${tooltips}
    </div>
  `;
};

const LineChart = ({ data, visibleBars, colors, dataOnHorizontalAxisEach }) => {
  const { dates, series } = useMemo(
    () => transformData(data, colors, visibleBars),
    [data, colors, visibleBars]
  );

  const options = useMemo(
    () => ({
      title: {
        text: "Gráfico de Líneas de Temperaturas",
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
      },
      tooltip: {
        trigger: "axis",
        formatter: (params) => formatTooltip(params, dates, visibleBars),
      },
      xAxis: {
        type: "category",
        data: dates,
        axisLabel: {
          // rotate: 45,
          formatter: (value, index) => {
            return index % dataOnHorizontalAxisEach === 0 ? value : ""; //Esto muestra la leyenda del eje X cada N elementos. Lo su
          },
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: "value",
      },
      grid: {
        left: "40px",
        right: "0",
      },
      series: series.map((item, index) => ({
        ...item,
        type: "line",
        symbol: "none", // Elimina los círculos en los puntos de datos
        smooth: false, // Desactiva la interpolación suave, haciendo la línea recta
        itemStyle: {
          color: colors[index % colors.length],
        },
      })),
    }),
    [dates, series, visibleBars, colors] // Añadido colors a las dependencias
  );

  return (
    <ReactECharts option={options} style={{ height: 400, width: "100%" }} />
  );
};

export default LineChart;

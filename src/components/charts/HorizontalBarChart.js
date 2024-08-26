import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";

const transformData = (data) => {
  const categories = data.map((item) => item.name);
  const minValues = data.map((item) => item.minTemp);
  const ranges = data.map((item) =>
    item.maxTemp !== null && item.minTemp !== null
      ? item.maxTemp - item.minTemp
      : 0
  );
  const maxTemp = data.map((item) => item.maxTemp);
  const avgValues = data.map((item) => item.avgTemp);

  return { categories, minValues, ranges, maxTemp, avgValues };
};

const formatTooltip = (params, colors) => {
  const minTemp = params[0]?.value;
  if (!minTemp) return "";

  const range = params[1]?.value;
  const maxTemp = minTemp + range;
  const avgTemp = params[3]?.value;

  // Determinar el color de la barra
  const barColor = colors[params[1]?.dataIndex];

  return `
    <div style="border: 4px solid ${barColor}; padding: 10px; border-radius: 5px">            
      <b>Min -</b> ${minTemp} °C<br/>
      <b>Max -</b> ${maxTemp} °C<br/>
      <b>Avg -</b> ${avgTemp} °C
    </div>
  `;
};

const HorizontalBarChart = ({ data, visibleBars, colors }) => {
  const { categories, minValues, ranges, maxTemp, avgValues } = useMemo(
    () => transformData(data),
    [data]
  );

  // Dimensiones del símbolo del scatter
  const getSymbolSize = (val) => (val !== null ? [3, 35] : [0, 0]);

  const options = useMemo(
    () => ({
      title: {
        text: "Average Temperature (ºC)",
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
      },
      grid: {
        show: true,
        backgroundColor: "#f7f7fc",
        left: "15%",
        right: "5%",
        top: "15%",
        bottom: "5%",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        borderWidth: 0,
        padding: 0,
        formatter: (params) => formatTooltip(params, colors),
      },
      xAxis: {
        type: "value",
        position: "top",
        splitLine: {
          show: true,
          lineStyle: {
            color: "#c2c1c2",
            type: "solid",
            width: 2,
          },
        },
      },
      yAxis: {
        type: "category",
        data: categories,
        inverse: true, // Invertir el eje Y para que la primera barra esté en la parte superior
        splitLine: {
          show: true,
          lineStyle: {
            color: "#e9e8ee",
            type: "solid",
          },
        },
        axisLabel: {
          formatter: (value, index) =>
            value === "" ? `${value}` : ` ${value}   {icon${index}|}`,
          // Esta parte es bastante dificil de entender si no sabes como funciona el Rich de Echarts
          // La propiedad Rich permite dar estilos personalizados al texto de un Formatter
          rich: {
            // Reduce() nos va a devolver un objeto con tantos objetos como colores haya {icon$index: {width, height, borderRadius, backgroundColor}}
            // El "Spread Operator (...)" nos va a crear la propiedad icon$index para cada objeto creado en el acumulador dentro de la propiedad Rich, permitiendo
            // el mapeado del formatter -> icon1|, icon2|, icon3|. Cada uno de estos, tendrá su propio backgroundColor.
            ...colors.reduce((acumulator, color, index) => {
              acumulator[`icon${index}`] = {
                width: 15,
                height: 15,
                borderRadius: 50,
                backgroundColor: color,
              };
              return acumulator;
            }, {}),
          },
        },
      },
      series: [
        {
          name: "Start",
          type: "bar",
          stack: "total",
          itemStyle: {
            color: "transparent", // Barra invisible para la posición inicial
          },
          data: visibleBars.map((isVisible, index) =>
            isVisible ? minValues[index] : false
          ),
        },
        {
          name: "Range",
          type: "bar",
          stack: "total",
          itemStyle: {
            color: (params) => colors[params.dataIndex], // Aplicar color basado en el índice de datos
          },
          data: visibleBars.map((isVisible, index) =>
            isVisible ? ranges[index] : false
          ),
        },
        {
          name: "Min",
          type: "scatter",
          symbol: "rect",
          symbolSize: getSymbolSize,
          itemStyle: {
            color: "black",
          },
          emphasis: {
            scale: false,
          },
          data: visibleBars.map((isVisible, index) =>
            isVisible ? minValues[index] : false
          ),
        },
        {
          name: "Avg",
          type: "scatter",
          symbol: "rect",
          symbolSize: getSymbolSize,
          itemStyle: {
            color: "black",
          },
          emphasis: {
            scale: false,
          },
          data: visibleBars.map((isVisible, index) =>
            isVisible ? avgValues[index] : false
          ),
        },
        {
          name: "Max",
          type: "scatter",
          symbol: "rect",
          symbolSize: getSymbolSize,
          itemStyle: {
            color: "black",
          },
          emphasis: {
            scale: false,
          },
          data: visibleBars.map((isVisible, index) =>
            isVisible ? maxTemp[index] : false
          ),
        },
      ],
    }),
    [categories, minValues, ranges, maxTemp, avgValues, colors, visibleBars] //Si cambia alguno de estos valores, se vuelve a cargar todo el código (optimizacion con useMemo)
  );

  return (
    <div>
      <ReactECharts option={options} style={{ height: 600, width: "100%" }} />
    </div>
  );
};

export default HorizontalBarChart;

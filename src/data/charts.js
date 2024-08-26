const generateRandomData = (length) => {
  return Array.from({ length }, () => (Math.random() * 30).toFixed(1));
};
class ChartData {
  static colors = [
    "#3381AF",
    "#3FA27E",
    "#47A23F",
    "#DB6B30",
    "#B595D7",
    "#E433DD",
    "#40BAE7",
    "#FFBE16",
    "#152E87",
    "#E52C42",
  ];

  static dataBarChart = [
    {
      name: "Uni Controller | PT1000 ext.",
      minTemp: 30,
      maxTemp: 40,
      avgTemp: 35,
    },
    { name: "HB - 25m", minTemp: 25, maxTemp: 50, avgTemp: 38 },
    {
      name: "Uni Controller | PT2000 ext.",
      minTemp: 30,
      maxTemp: 45,
      avgTemp: 32,
    },
    { name: "HB - 5m", minTemp: 25.2, maxTemp: 35, avgTemp: 33 },
    { name: "Legiotherm", minTemp: 25, maxTemp: 35, avgTemp: 26 },
    { name: "HB - 15m", minTemp: 21, maxTemp: 51, avgTemp: 25 },
    { name: "HB - 20m (4)", minTemp: 22, maxTemp: 52, avgTemp: 37 },
    { name: "HB - 20m (5)", minTemp: 28, maxTemp: 41, avgTemp: 33 },
    { name: "HB - 25m", minTemp: 24.1, maxTemp: 34, avgTemp: 25 },
    // { name: "HB - 25m", minTemp: 24.9, maxTemp: 34, avgTemp: 27 },
    { name: "", minTemp: null, maxTemp: null, avgTemp: null },
  ];

  static dataLinealChart = {
    dates: Array.from({ length: 90 }, (_, i) => {
      const date = new Date(2024, 0, i + 1);
      return date.toISOString().split("T")[0]; // Formato YYYY-MM-DD
    }),
    items: [
      {
        name: "Sensor 1",
        avgTemp: generateRandomData(90),
      },
      {
        name: "Sensor 2",
        avgTemp: generateRandomData(90),
      },
      {
        name: "Sensor 3",
        avgTemp: generateRandomData(90),
      },
      {
        name: "Sensor 4",
        avgTemp: generateRandomData(90),
      },
      {
        name: "Sensor 5",
        avgTemp: generateRandomData(90),
      },
      {
        name: "Sensor 6",
        avgTemp: generateRandomData(90),
      },
      {
        name: "Sensor 7",
        avgTemp: generateRandomData(90),
      },
      {
        name: "Sensor 8",
        avgTemp: generateRandomData(90),
      },
      {
        name: "Sensor 9",
        avgTemp: generateRandomData(90),
      },
      {
        name: "Sensor 10",
        avgTemp: generateRandomData(90),
      },
    ],
  };
}

export default ChartData;

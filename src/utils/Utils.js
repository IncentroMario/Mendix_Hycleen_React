const desiredLength = 10;
// Añade elementos por defecto hasta que el array tenga 10 elementos
export const ensureArrayLength = (arr) => {
  const defaultElement = {
    name: "",
    minTemp: null,
    maxTemp: null,
    avgTemp: null,
  };

  while (arr.length < desiredLength) {
    arr.push({ ...defaultElement });
  }
  return arr;
};

export const fillMissingItems = (data) => {
  const { dates, items } = data;

  // Define el número de elementos que faltan
  const itemsToAdd = desiredLength - items.length;

  // Si la longitud de items es menor que el deseado, añade elementos vacíos
  if (itemsToAdd > 0) {
    const emptyItems = Array.from({ length: itemsToAdd }, (_, index) => ({
      name: "",
      average: new Array(dates.length).fill(null),
    }));

    return {
      dates,
      items: [...items, ...emptyItems],
    };
  }

  // Si no faltan elementos, devuelve los datos originales
  return data;
};

export const truncateText = (text, maxLength) => {
  if (maxLength === undefined) {
    maxLength = 30;
  }

  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

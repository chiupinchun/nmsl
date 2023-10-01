const deepCopy = <T = any>(data: T): T => {
  if (typeof data === 'object') {
    const result: any = Array.isArray(data) ? [] : {};
    for (const key in data) result[key] = deepCopy(data[key]);
    return result;
  } else return data;
};

export default deepCopy;
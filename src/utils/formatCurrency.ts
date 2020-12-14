export default (value: number): string => {
  const roundVal = Number(value.toFixed(2));
  return new Intl.NumberFormat("de-DE").format(roundVal);
};

const normalizeInput = (value, previousValue) => {
  const deleting = previousValue && previousValue.length > value.length;
  if (deleting) {
    if (
      previousValue[previousValue.length - 1] === ')' ||
      value[value.length - 1] === '(' ||
      value[value.length - 1] === ' '
    ) {
      return value.substring(0, value.length - 1);
    }
    return value;
  }
  if (!value) {
    return value;
  }
  const currentValue = value.replace(/[^\d]/g, '');
  const cvLength = currentValue.length;
  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 4) {
      return currentValue;
    }
    if (cvLength < 7) {
      return `${currentValue.slice(0, 3)} ${currentValue.slice(3)}`;
    }
    return `${currentValue.slice(0, 3)} ${currentValue.slice(
      3,
      6,
    )} (${currentValue.slice(6, 10)})`;
  }
  return value;
};
export default normalizeInput;


export default (expenses) => {
  const sum = (accumelator, currentValue) => accumelator + currentValue;

  return expenses
    .map(element => element.amount)
    .reduce(sum, 0);
};
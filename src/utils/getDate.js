function addDays(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getDate(data, index) {
  let row = document.getElementById(index + "predDate");
  let dueDate = document.getElementById(index + "dueDate").innerHTML;
  row.innerHTML = addDays(dueDate, Math.round(data.predictions))
    .toString()
    .slice(4, 15);
}

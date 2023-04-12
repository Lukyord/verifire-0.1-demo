export function GetDateInString() {
  const date = new Date();

  const year = date.getFullYear(); // returns the year (e.g. 2023)
  const month = date.getMonth() + 1; // returns the month (0-11), so we add 1 to get 1-12
  const day = date.getDate(); // returns the day of the month (1-31)
  const hour = date.getHours(); // returns the hour (0-23)
  const minute = date.getMinutes(); // returns the minute (0-59)
  const second = date.getSeconds(); // returns the second (0-59)

  const dateString =
    year +
    "-" +
    month +
    "/" +
    day +
    "/" +
    hour +
    ":" +
    minute +
    ":" +
    second +
    "-";

  return dateString;
}

export function GetTimeInString() {
  const date = new Date();

  const year = date.getFullYear(); // returns the year (e.g. 2023)
  const month = date.getMonth() + 1; // returns the month (0-11), so we add 1 to get 1-12
  const day = date.getDate(); // returns the day of the month (1-31)
  const hour = date.getHours(); // returns the hour (0-23)
  const minute = date.getMinutes(); // returns the minute (0-59)
  const second = date.getSeconds(); // returns the second (0-59)

  const timeString =
    year +
    "-" +
    month +
    "-" +
    day +
    "-" +
    hour +
    ":" +
    minute +
    ":" +
    second +
    "-";

  return timeString;
}

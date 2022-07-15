export function createMarkup(data) {
  return { __html: data.content };
}

export const calcEventTime = (rawTime) => {
  const startIndex = rawTime.indexOf("T");
  const endIndex = rawTime.indexOf("+");
  const length = endIndex - startIndex;
  return rawTime.substr(startIndex + 1, length - 1);
};

export const calcCountdown = (data) => {
  const eventDate = new Date(data.start).getTime();
  const now = Date.now();
  const diff = eventDate - now;
  let day = 0,
    hour = 0,
    minute = 0;
  minute = Math.round(diff / 60000);
  if (minute > 60) {
    hour = Math.round(minute / 60);
    minute = minute % 60;
    if (hour > 24) {
      day = Math.round(hour / 24);
      hour = hour % 24;
    } 
  }
  console.log(day, hour, minute);
  return {
    day, hour, minute
  }
};

export const changeDay = (date) => {
  const day = date.split(" ")[0];

  switch (day) {
    case "Sun":
      return "Pazar";
      break;
    case "Mon":
      return "Pazartesi";
      break;
    case "Tue":
      return "Salı";
      break;
    case "Wed":
      return "Çarşamba";
      break;
    case "Thu":
      return "Perşembe";
      break;
    case "Fri":
      return "Cuma";
      break;
    case "Sat":
      return "Cumartesi";
      break;
    default:
      return day;
      break;
  }
};

export const changeMonth = (date) => {
  const month = date.split(" ")[1];

  switch (month) {
    case "Jan":
      return "Ocak";
      break;
    case "Feb":
      return "Şubat";
      break;
    case "Mar":
      return "Mart";
      break;
    case "Apr":
      return "Nisan";
      break;
    case "May":
      return "Mayıs";
      break;
    case "Jun":
      return "Haziran";
      break;
    case "Jul":
      return "Temmuz";
      break;
    case "Aug":
      return "Ağustos";
      break;
    case "Sep":
      return "Eylül";
      break;
    case "Oct":
      return "Ekim";
      break;
    case "Nov":
      return "Kasım";
      break;
    case "Dec":
      return "Aralık";
      break;

    default:
      return month;
      break;
  }
};

export const setDate = (date) => {
  const day = changeDay(date);
  const month = changeMonth(date);
  const firstDay = date.slice(0, 3);
  const firstMonth = date.slice(4, 7);
  date = date.replace(firstDay, day);
  date = date.replace(firstMonth, month);
  date = date.split(" ");
  const newDate = [date[2], date[1], date[3], date[0]];
  return newDate.join(" ");
};

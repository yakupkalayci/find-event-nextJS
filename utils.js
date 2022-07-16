export function createMarkup(data) {
  return { __html: data.content };
}

export const removeSemicolon = () => {
  const content = document.querySelector("#description");
  content.removeChild(content.lastChild);
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
  return {
    day, hour, minute
  }
};

export const changeDay = (date) => {
  const day = date.split(" ")[0];

  switch (day) {
    case "Sun":
      return "Pazar";
    case "Mon":
      return "Pazartesi";
    case "Tue":
      return "Salı";
    case "Wed":
      return "Çarşamba";
    case "Thu":
      return "Perşembe";
    case "Fri":
      return "Cuma";
    case "Sat":
      return "Cumartesi";
    default:
      return day;
  }
};

export const changeMonth = (date) => {
  const month = date.split(" ")[1];

  switch (month) {
    case "Jan":
      return "Ocak";
    case "Feb":
      return "Şubat";
    case "Mar":
      return "Mart";
    case "Apr":
      return "Nisan";
    case "May":
      return "Mayıs";
    case "Jun":
      return "Haziran";
    case "Jul":
      return "Temmuz";
    case "Aug":
      return "Ağustos";
    case "Sep":
      return "Eylül";
    case "Oct":
      return "Ekim";
    case "Nov":
      return "Kasım";
    case "Dec":
      return "Aralık";

    default:
      return month;
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

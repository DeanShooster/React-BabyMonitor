export function getAgeInYear(birthDate: Date) {
  const today = new Date();

  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();

  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  let age = todayYear - birthYear;
  if (todayMonth < birthMonth || (todayMonth === birthMonth && todayDay < birthDay)) age--;

  return age;
}

export function isBefore(dateOne: Date, dateTwo: Date) {
  const date1 = new Date(dateOne.getFullYear(), dateOne.getMonth(), dateOne.getDate());
  const date2 = new Date(dateTwo.getFullYear(), dateTwo.getMonth(), dateTwo.getDate());

  return date1 < date2;
}

export function calculateSpecificAge(birthDate: Date) {
  const today = new Date();
  const birth = new Date(birthDate);

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    days += prevMonth.getDate();
  }

  return { years: years === 0 ? null : years, months: months === 0 ? null : months, days: days === 0 ? null : days };
}

export function formatDateToDDMMYYYY(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatDateToHHMMSS(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

export function getTimeDiffInHHMMSS(date1: Date, date2: Date) {
  const diffInMillis = Math.abs(date2.getTime() - date1.getTime());

  const diffInSeconds = Math.floor(diffInMillis / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  const seconds = diffInSeconds % 60;
  const minutes = diffInMinutes % 60;
  const hours = diffInHours;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function isSameDay(date1: Date, date2: Date) {
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

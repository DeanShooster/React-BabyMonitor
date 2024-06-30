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

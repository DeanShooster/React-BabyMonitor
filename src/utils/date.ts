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

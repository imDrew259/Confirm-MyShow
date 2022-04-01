const getDayInWords = (dayNum) => {
  let day;
  if (dayNum === 0) day = "Sun";
  else if (dayNum === 1) day = "Mon";
  else if (dayNum === 2) day = "Tue";
  else if (dayNum === 3) day = "Wed";
  else if (dayNum === 4) day = "Thu";
  else if (dayNum === 5) day = "Fri";
  else if (dayNum === 6) day = "Sat";
  return day;
};

const date = new Date();
const today = new Date(date);
const tom = new Date(date.setDate(new Date().getDate() + 1));
const DAT = new Date(date.setDate(new Date().getDate() + 2));
const DAAT = new Date(date.setDate(new Date().getDate() + 3));

export default {
  today: today,
  tom: tom,
  tomD: getDayInWords(tom.getDay()),
  DAT: DAT,
  DATD: getDayInWords(DAT.getDay()),
  DAAT: DAAT,
  DAATD: getDayInWords(DAAT.getDay()),
};

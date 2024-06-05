import { parse, isDate, isBefore, startOfDay } from "date-fns";

export const isValidDob = (date: string): boolean => {
  const dateFormat = "yyyy-MM-dd";

  const parsedDate = parse(date, dateFormat, new Date());
  const isValidDate = isDate(parsedDate) && isBefore(parsedDate, new Date());
  return isValidDate;
};

// this function return true if data is past day else true
export const isPastDay = (date: string): boolean => {
  const dateFormat: string = "yyyy-MM-dd"
  const parsedDate = parse(date, dateFormat, new Date());

  if (!isDate(parsedDate)) {
    return false;
  }

  const today = startOfDay(new Date());
  return isBefore(parsedDate, today); 
};
import { parse, isDate, isBefore } from "date-fns";


export const isValidDob = (date: string): boolean => {
  const dateFormat = "yyyy-MM-dd";

  const parsedDate = parse(date, dateFormat, new Date());
  const isValidDate = isDate(parsedDate) && isBefore(parsedDate, new Date());
  return isValidDate;
};


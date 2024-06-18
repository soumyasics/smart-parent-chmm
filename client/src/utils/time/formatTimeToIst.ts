export const formatTimeToIST = (utcDate: string) => {
  const date = new Date(utcDate);
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

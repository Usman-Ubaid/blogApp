export const formatDate = (date: string) => {
  const originalDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = originalDate.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const getFormattedDate = () => {
  const today = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = today.getDate();
  const monthIndex = today.getMonth();
  const year = today.getFullYear();
  return `${day} ${monthNames[monthIndex]} ${year}`;
};

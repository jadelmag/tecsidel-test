
export const formatDate = (strDate: string): string => {
  if (!strDate || isNaN(new Date(strDate).getTime())) {
    return "---";
  }

  const date = new Date(strDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

import { number } from "zod";

export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatDate(dateString) {
  const uploadDate = new Date(dateString);

  const currentDate = new Date();

  const timeDifferenceMs = currentDate - uploadDate;

  const formattedDate = () => {
    const numberOfDays = Math.floor(timeDifferenceMs / 86400000);

    if (numberOfDays >= 7) {
      const numberOfWeeks = numberOfDays / 7;
      if (numberOfWeeks < 2) {
        return `${String(numberOfWeeks).slice(0, 1)} week ago`;
      } else {
        return `${String(numberOfWeeks).slice(0, 1)} weeks ago`;
      }
    } else if (numberOfDays == 1) {
      return `${numberOfDays} day go`;
    } else if (numberOfDays == 0) {
      return "Today";
    } else {
      return `${numberOfDays} days go`;
    }
  };

  return `${formattedDate()}`;
}

export function titleCase(string) {
  return string.replace(/\w\S*/g, (text) => {
    if (text === "and") {
      return "and";
    } else {
      return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase();
    }
  });
}

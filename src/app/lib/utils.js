import { number } from "zod";

export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatDate(dateString) {
  const uploadDate = new Date(dateString);
  const uploadDay = uploadDate.getDate();

  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  const formattedDate = () => {
    const numberOfDays = currentDay - uploadDay;

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

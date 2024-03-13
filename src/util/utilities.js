export const formatDateToPST = (dateString) => {
  const date = new Date(dateString);

  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Los_Angeles',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export function isValidNumber(value) {
  return value !== null && value !== undefined && !Number.isNaN(value);
}

export function isValidEmail(email) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}

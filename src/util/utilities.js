export const formatDateToPST = (dateString) => {
  const date = new Date(dateString);

  // Format the date to PST (UTC -8 hours)
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use 24-hour format
    timeZone: 'America/Los_Angeles',
  };

  // Return formatted string
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export function isValidNumber(value) {
  return value !== null && value !== undefined && !Number.isNaN(value);
}

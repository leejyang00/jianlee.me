// Utility function to format date from "2025-07-04" to "July 4th, 2025"
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  const formattedDate = date.toLocaleDateString('en-US', options);
  
  // Add ordinal suffix (st, nd, rd, th)
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  
  return formattedDate.replace(/\b\d+(?=,)/, day + suffix);
};

// Helper function to get ordinal suffix
export const getOrdinalSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

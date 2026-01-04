/**
 * Universal Data Adapters
 * Prevents runtime crashes from inconsistent NoSQL data
 */

// Handles String / Object / Array image formats
export const getImgSrc = (image) => {
  if (!image) return "https://placehold.co/600x400?text=No+Image";
  if (typeof image === "string") return image;
  if (Array.isArray(image) && image.length > 0) return image[0];
  if (typeof image === "object" && image.url) return image.url;
  return "https://placehold.co/600x400?text=Invalid+Format";
};

// Converts Firestore Timestamp or JS Date -> milliseconds
export const getSafeDate = (date) => {
  if (!date) return Date.now();
  if (date.seconds) return date.seconds * 1000; // Firestore Timestamp
  if (typeof date === "string") return new Date(date).getTime();
  return date; // Already ms
};

// Extracts YouTube video ID and builds iframe embed
export const getEmbedUrl = (youtubeUrl) => {
  if (!youtubeUrl) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = youtubeUrl.match(regExp);
  return (match && match[2].length === 11) 
    ? `https://www.youtube.com/embed/${match[2]}` 
    : null;
};
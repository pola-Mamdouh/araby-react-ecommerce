/**
 * The ultimate image cleaner for the EscuelaJS API
 * @param {string | string[]} imgData - The image data from the API
 * @returns {string} - A clean, usable URL
 */
export const getCleanImage = (imgData) => {
  if (!imgData) return "https://via.placeholder.com/400"; // Fallback if empty

  let target = "";

  // 1. If it's an array, pick the first item
  if (Array.isArray(imgData)) {
    target = imgData[0];
  } else {
    target = imgData;
  }

  // 2. Check if the string is a "fake array" (starts with [ )
  if (typeof target === "string" && target.startsWith("[")) {
    try {
      // Clean up single quotes which break JSON.parse
      const validJson = target.replace(/'/g, '"');
      const parsed = JSON.parse(validJson);
      return Array.isArray(parsed) ? parsed[0] : parsed;
    } catch (error) {
      // 3. Fallback: Manual cleanup if JSON.parse fails
      return target.replace(/[\[\]"']/g, ""); 
    }
  }

  // 4. Return as is if it's already a clean string
  return target;
};
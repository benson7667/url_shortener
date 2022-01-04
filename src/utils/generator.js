/**
 * This function will generate a random string from the whitelisted characters
 */
function generateShortId(length = 8) {
  const whiteListChars =
    "abcdefghifjklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  let count = 0;
  let generated = "";

  if (!length) return "";

  while (count < length) {
    const randomPos = Math.floor(Math.random() * whiteListChars.length);
    generated += whiteListChars.charAt(randomPos);
    count++;
  }

  return generated;
}

module.exports = {
  generateShortId,
};

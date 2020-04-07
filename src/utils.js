export const camelCase = (string) => {
  string = string
    .toLowerCase()
    .replace(/(?:(^.)|([-_\s]+.))/g, (match) =>
      match.charAt(match.length - 1).toUpperCase()
    );
  return string.charAt(0).toLowerCase() + string.substring(1);
};

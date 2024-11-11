/* eslint-disable no-control-regex */
export const userTagRegex = /(@(?:[^\x00-\x7F]|\w)+)/g;

export const highlightedText = (matchedPart, text) => {
  let keywords = matchedPart?.split?.("*");
  keywords = [
    ...(keywords || []),
    ...(matchedPart?.split?.("*")?.flatMap?.((item) => item?.split?.(" ")) ||
      []),
  ];
  const pattern = new RegExp(`@(${keywords?.join("|")})`, "g");
  const phrase = text;
  const result = phrase?.replace(
    pattern,
    (match) =>
      `<span class="text-primary cursor-pointer">${match.replace(
        "@",
        "",
      )}</span>`,
  );
  return result;
};

import en from "./en";

const lang = {
  en: en(),
};

export default function getLang(type = "en") {
  return lang[type];
}

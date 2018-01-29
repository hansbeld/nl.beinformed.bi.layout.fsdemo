// @flow

const javaFormatMapping = {
  d: "D",
  dd: "DD",
  y: "YYYY",
  yy: "YY",
  yyy: "YYYY",
  yyyy: "YYYY",
  a: "a",
  A: "A",
  M: "M",
  MM: "MM",
  MMM: "MMM",
  MMMM: "MMMM",
  h: "h",
  hh: "hh",
  H: "H",
  HH: "HH",
  k: "k",
  K: "H",
  m: "m",
  mm: "mm",
  s: "s",
  ss: "ss",
  S: "SSS",
  SS: "SSS",
  SSS: "SSS",
  E: "ddd",
  EE: "ddd",
  EEE: "ddd",
  EEEE: "dddd",
  EEEEE: "dddd",
  EEEEEE: "dddd",
  D: "DDD",
  w: "W",
  ww: "WW",
  z: "ZZ",
  zzzz: "Z",
  Z: "ZZ",
  X: "ZZ",
  XX: "ZZ",
  XXX: "Z",
  u: "E"
};

const cachedFormats = {};

/**
 * Map java pattern to moment pattern
 */
const getMappedPattern = pattern => {
  if (pattern === "") {
    return "";
  }

  return javaFormatMapping[pattern] || pattern;
};

/**
 * Escape text inside format text
 */
const escapeFormatText = format =>
  format.replace(/'(.*?)'/g, "[$1]").replace(/]\[|\[]/g, "'");

const mapJavaFormatToMoment = (format: string) => {
  let previousChar = "";
  let momentFormat = "";
  let currentPattern = "";

  format.split("").forEach(character => {
    if (previousChar === "" || character === previousChar) {
      currentPattern = currentPattern + character;
    } else {
      momentFormat = momentFormat + getMappedPattern(currentPattern);
      currentPattern = character;
    }

    previousChar = character;
  });

  // Last sub pattern
  momentFormat = momentFormat + getMappedPattern(currentPattern);

  return momentFormat.replace(/y/g, "Y");
};

/**
 * Translates the java date format String to a momentjs format String.
 * @param {String} javaFormat The unmodified format string
 * @returns {String}
 */
const javaToMomentFormat = (javaFormat: string = "") => {
  if (cachedFormats[javaFormat]) {
    return cachedFormats[javaFormat];
  }

  const format = escapeFormatText(javaFormat);
  const momentFormat = mapJavaFormatToMoment(format);

  cachedFormats[javaFormat] = momentFormat;

  return momentFormat;
};

export default javaToMomentFormat;

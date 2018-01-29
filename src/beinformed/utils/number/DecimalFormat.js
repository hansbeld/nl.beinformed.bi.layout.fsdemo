/**
 * @class DecimalFormat
 * @constructor
 * @param {String} formatStr
 * @author Oskan Savli
 */
// eslint-disable-next-line func-style
function DecimalFormat(formatStr) {
  /**
   * @fieldOf DecimalFormat
   * @type String
   */
  this.prefix = "";
  /**
   * @fieldOf DecimalFormat
   * @type String
   */
  this.suffix = "";
  /**
   * @description Grouping size
   * @fieldOf DecimalFormat
   * @type String
   */
  this.comma = 0;
  /**
   * @description Minimum integer digits to be displayed
   * @fieldOf DecimalFormat
   * @type Number
   */
  this.minInt = 1;
  /**
   * @description Minimum fractional digits to be displayed
   * @fieldOf DecimalFormat
   * @type String
   */
  this.minFrac = 0;
  /**
   * @description Maximum fractional digits to be displayed
   * @fieldOf DecimalFormat
   * @type String
   */
  this.maxFrac = 0;

  // get prefix
  for (let i = 0; i < formatStr.length; i++) {
    if (formatStr.charAt(i) === "#" || formatStr.charAt(i) === "0") {
      this.prefix = formatStr.substring(0, i);
      // eslint-disable-next-line no-param-reassign
      formatStr = formatStr.substring(i);
      break;
    }
  }

  // get suffix
  this.suffix = formatStr.replace(/[#]|[0]|[,]|[.]/g, "");

  // get number as string
  const numberStr = formatStr.replace(/[^0#,.]/g, "");

  let intStr = "";
  let fracStr = "";
  const point = numberStr.indexOf(".");
  if (point === -1) {
    intStr = numberStr;
  } else {
    intStr = numberStr.substring(0, point);
    fracStr = numberStr.substring(point + 1);
  }

  const commaPos = intStr.lastIndexOf(",");
  if (commaPos !== -1) {
    this.comma = intStr.length - 1 - commaPos;
  }

  // remove commas
  intStr = intStr.replace(/[,]/g, "");

  fracStr = fracStr.replace(/[,]|[.]+/g, "");

  this.maxFrac = fracStr.length;

  // remove all except zero
  let tmp = intStr.replace(/[^0]/g, "");
  if (tmp.length > this.minInt) this.minInt = tmp.length;
  tmp = fracStr.replace(/[^0]/g, "");
  this.minFrac = tmp.length;
}

/**
 * @description Formats given value
 * @methodOf DecimalFormat
 * @param {String} numberStr
 * @return {String} Formatted number
 * @author Oskan Savli
 */
// 1223.06 --> $1,223.06
// eslint-disable-next-line complexity
DecimalFormat.prototype.format = function format(numStr) {
  // remove prefix, suffix and commas
  let numberStr = this.formatBack(numStr).toLowerCase();

  // do not format if not a number
  if (isNaN(numberStr) || numberStr.length === 0) return numStr;

  // scientific numbers
  if (numberStr.indexOf("e") !== -1) {
    const n = Number(numberStr);
    if (n === "Infinity" || n === "-Infinity") return numberStr;
    numberStr = String(n);
    if (numberStr.indexOf("e") !== -1) return numberStr;
  }

  let negative = false;
  // remove sign
  if (numberStr.charAt(0) === "-") {
    negative = true;
    numberStr = numberStr.substring(1);
  } else if (numberStr.charAt(0) === "+") {
    numberStr = numberStr.substring(1);
  }

  // position of point character
  const point = numberStr.indexOf(".");
  let intStr = "";
  let fracStr = "";
  if (point === -1) {
    intStr = numberStr;
  } else {
    intStr = numberStr.substring(0, point);
    fracStr = numberStr.substring(point + 1);
  }

  // if percentage, number will be multiplied by 100.
  let maxFrac = this.maxFrac,
    minFrac = this.minFrac,
    minInt = this.minInt;

  // remove other point characters
  fracStr = fracStr.replace(/[.]/, "");
  const isPercentage = this.suffix && this.suffix.charAt(0) === "%";
  if (isPercentage) {
    minInt -= 2;
    minFrac += 2;
    maxFrac += 2;
  }

  if (fracStr.length > maxFrac) {
    // round
    let num = Number(`0.${fracStr}`);
    num = maxFrac === 0 ? Math.round(num) : num.toFixed(maxFrac);

    // toFixed method has bugs on IE (0.7 --> 0)
    // eslint-disable-next-line no-magic-numbers
    fracStr = num.toString(10).substr(2);

    // carry
    let c = num >= 1 ? 1 : 0;
    let i = intStr.length - 1,
      x = "";

    while (c) {
      // increment intStr
      if (i === -1) {
        intStr = `1${intStr}`;
        break;
      } else {
        x = intStr.charAt(i);

        // eslint-disable-next-line no-magic-numbers
        if (x === 9) {
          x = "0";
          c = 1;
        } else {
          // eslint-disable-next-line no-plusplus
          x = `${++x}`;
          c = 0;
        }
        intStr =
          intStr.substring(0, i) + x + intStr.substring(i + 1, intStr.length);

        // eslint-disable-next-line no-plusplus
        i--;
      }
    }
  }
  for (let i = fracStr.length; i < minFrac; i++) {
    // if minFrac=4 then 1.12 --> 1.1200
    fracStr = `${fracStr}0`;
  }
  while (
    fracStr.length > minFrac &&
    fracStr.charAt(fracStr.length - 1) === "0"
  ) {
    // if minInt=4 then 00034 --> 0034)
    fracStr = fracStr.substring(0, fracStr.length - 1);
  }

  for (let i = intStr.length; i < minInt; i++) {
    // if minInt=4 then 034 --> 0034
    intStr = `0${intStr}`;
  }
  while (intStr.length > minInt && intStr.charAt(0) === "0") {
    // if minInt=4 then 00034 --> 0034)
    intStr = intStr.substring(1);
  }

  if (isPercentage) {
    // multiply by 100
    intStr += fracStr.substring(0, 2);
    fracStr = fracStr.substring(2);
  }

  let j = 0;
  for (let i = intStr.length; i > 0; i--) {
    // add commas
    if (j !== 0 && j % this.comma === 0) {
      intStr = `${intStr.substring(0, i)},${intStr.substring(i)}`;
      j = 0;
    }

    // eslint-disable-next-line no-plusplus
    j++;
  }

  let formattedValue = "";
  if (fracStr.length > 0)
    formattedValue = `${this.prefix + intStr}.${fracStr}${this.suffix}`;
  else formattedValue = this.prefix + intStr + this.suffix;

  if (negative) {
    formattedValue = `-${formattedValue}`;
  }

  return formattedValue;
};

/**
 * @description Converts formatted value back to non-formatted value
 * @methodOf DecimalFormat
 * @param {String} fNumberStr Formatted number
 * @return {String} Original number
 * @author Oskan Savli
 */
DecimalFormat.prototype.formatBack = function formatBack(fNumStr) {
  /*
   * $1,223.06 --> 1223.06
   * ensure it is string
   */

  // eslint-disable-next-line no-param-reassign
  fNumStr = String(fNumStr);
  // do not return undefined or null
  if (!fNumStr) return "";
  if (!isNaN(fNumStr)) return this.getNumericString(fNumStr);
  let fNumberStr = fNumStr;
  let negative = false;
  if (fNumStr.charAt(0) === "-") {
    fNumberStr = fNumberStr.substr(1);
    negative = true;
  }
  const pIndex = fNumberStr.indexOf(this.prefix);
  const sIndex =
    this.suffix === ""
      ? fNumberStr.length
      : fNumberStr.indexOf(this.suffix, this.prefix.length + 1);
  if (pIndex === 0 && sIndex > 0) {
    // remove suffix
    fNumberStr = fNumberStr.substr(0, sIndex);
    // remove prefix
    fNumberStr = fNumberStr.substr(this.prefix.length);
    // remove commas
    fNumberStr = fNumberStr.replace(/,/g, "");
    if (negative) fNumberStr = `-${fNumberStr}`;
    if (!isNaN(fNumberStr)) return this.getNumericString(fNumberStr);
  }
  return fNumStr;
};
/**
 * @description We shouldn't return strings like 1.000 in formatBack method.
 * However, using only Number(str) is not enough, because it omits . in big numbers
 * like 23423423423342234.34 => 23423423423342236 . There's a conflict in cases
 * 6143 and 6541.
 * @methodOf DecimalFormat
 * @param {String} str Numberic string
 * @return {String} Corrected numeric string
 * @author Serdar Bicer
 */
DecimalFormat.prototype.getNumericString = function getNumericString(str) {
  // first convert to number
  const num = Number(str);
  // check if there is a missing dot
  const numStr = String(num);
  if (str.indexOf(".") > -1 && numStr.indexOf(".") < 0) {
    // check if original string has all zeros after dot or not
    for (let i = str.indexOf(".") + 1; i < str.length; i++) {
      // if not, this means we lost precision
      if (str.charAt(i) !== "0") return str;
    }
    return numStr;
  }
  return str;
};

export default DecimalFormat;
